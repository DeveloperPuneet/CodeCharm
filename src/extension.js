require("dotenv").config()
const vscode = require('vscode');
const fetch = require('node-fetch');

async function activate(context) {
    let disposable = vscode.commands.registerCommand('codewhiz.commentFunction', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showInformationMessage("No code selected!");
            return;
        }

        const comment = await getCommentFromGemini(selectedText);
        if (!comment) {
            vscode.window.showErrorMessage("Gemini couldn't generate comment after retry.");
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, comment);
        });
    });

    context.subscriptions.push(disposable);
    vscode.window.showInformationMessage("🧠 CodeWhiz v1.1 loaded with retry + inline mode!");
}

async function getCommentFromGemini(code) {
    const prompt = `You are a strict code-commenting assistant. Only add **inline comments** (4–5 words max) using emojis where necessary. DO NOT explain, DO NOT summarize, DO NOT use markdown or \`\`\`. DO NOT return the code inside triple backticks. Return only the modified code with inline comments where needed. Be brief, clear, and helpful.\n\n${code}`;

    try {
        const result = await callGemini(prompt);
        if (result) return result;

        // 🔁 Retry with stripped down backup prompt
        const retryPrompt = `Only return this code with helpful short inline comments (max 4–5 words). Use emojis. No summaries, no markdown, no backticks. Only the code.\n\n${code}`;
        const retryResult = await callGemini(retryPrompt);
        return retryResult || "// ⚠️ Gemini had a brain freeze. Try again later.";
    } catch (err) {
        console.error("💥 Gemini API Error:", err);
        return "// ❌ Error talking to Gemini.";
    }
}

async function callGemini(prompt) {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key='+ process.env.API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await res.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // 🚫 Strip markdown code blocks (```javascript, ```python, ```)
    text = text?.replace(/```[a-z]*\n?|```/gi, '').trim();

    return text || null;
}

function deactivate() { }

module.exports = { 
    activate, 
    deactivate 
};
