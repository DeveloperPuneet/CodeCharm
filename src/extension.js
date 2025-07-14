const vscode = require('vscode');
const fetch = require('node-fetch');

// 🧠 Activate Extension
async function activate(context) {
    // Comment Generation (Ctrl + Win + J)
    const commentCommand = vscode.commands.registerCommand('CodeCharm.commentFunction', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showInformationMessage("No code selected!");
            return;
        }

        const comment = await getCommentFromGemini(selectedText, "comment");
        if (!comment) {
            vscode.window.showErrorMessage("Gemini couldn't generate comment after retry.");
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, comment);
        });
    });

    // Readability Suggestion (Ctrl + Win + G)
    const readableCommand = vscode.commands.registerCommand('CodeCharm.suggestReadableCode', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showInformationMessage("No code selected!");
            return;
        }

        const readableCode = await getCommentFromGemini(selectedText, "readability");
        if (!readableCode) {
            vscode.window.showErrorMessage("Gemini failed to suggest improvements.");
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, readableCode);
        });
    });

    context.subscriptions.push(commentCommand, readableCommand);
    vscode.window.showInformationMessage("💫 CodeCharm v1.1 loaded with dual features!");
}

// 🧠 Get Gemini Comment or Refactor
async function getCommentFromGemini(code, mode = "comment") {
    let prompt = "";

    if (mode === "comment") {
        prompt = `You are a strict code-commenting assistant. Only add **inline comments** (4–5 words max) using emojis where necessary. DO NOT explain, DO NOT summarize, DO NOT use markdown or \`\`\`. DO NOT return the code inside triple backticks. Return only the modified code with inline comments where needed. Be brief, clear, and helpful. USE EMOJI IN COMMENTS FOR BETTER LOOK OF CODE.\n\n${code}`;
    } else if (mode === "readability") {
        prompt = `You are a clean code assistant. Refactor this code to improve readability. Rename unclear variables, break complex statements into simpler ones, and format it cleanly. DO NOT return explanations or markdown. ONLY return the improved code, no backticks.\n\n${code}`;
    }

    try {
        const result = await callGemini(prompt);
        return result || null;
    } catch (err) {
        console.error("❌ Gemini Error:", err);
        return null;
    }
}

// 📡 Gemini API Call with fallback
async function callGemini(prompt) {
    const api = vscode.workspace.getConfiguration().get("CodeCharm.zetaFlux");
    if (!api) {
        vscode.window.showErrorMessage("❌ Gemini API key (zetaFlux) missing in settings.");
        return null;
    }

    const primaryModel = "gemini-2.0-flash-lite";
    const backupModel = "gemini-2.0-flash";

    async function fetchFromModel(model) {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${api}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        return await res.json();
    }

    let data = await fetchFromModel(primaryModel);
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || data?.error) {
        console.warn("⚠️ Primary model failed. Switching to backup model...");
        data = await fetchFromModel(backupModel);
        text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    text = text?.replace(/```[a-z]*\n?|```/gi, '').trim();
    return text || null;
}

// ❌ Deactivate
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
