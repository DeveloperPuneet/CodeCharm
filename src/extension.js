const vscode = require('vscode'); // VS Code module needed 💻
const fetch = require('node-fetch'); // For making requests 🌐

async function activate(context) {
    let disposable = vscode.commands.registerCommand('codewhiz.commentFunction', async function () { // Register the command ⚙️
        const editor = vscode.window.activeTextEditor; // Get active editor 📝
        if (!editor) return; // Return if no editor 🚪

        const selection = editor.selection; // Get the selection 🖱️
        const selectedText = editor.document.getText(selection); // Get selected text ✍️

        if (!selectedText) { // Check if text exists
            vscode.window.showInformationMessage("No code selected!"); // Show info message ℹ️
            return; // Return if no text selected
        }

        const comment = await getCommentFromGemini(selectedText); // Get comment from Gemini 💬
        if (!comment) { // Check if comment exists
            vscode.window.showErrorMessage("Gemini couldn't generate comment after retry."); // Error message ❌
            return; // Return if no comment 🚪
        }

        editor.edit(editBuilder => { // Start editing ✍️
            editBuilder.replace(selection, comment); // Replace selection with comment 🔄
        });
    });

    context.subscriptions.push(disposable); // Add to subscriptions ✅
    vscode.window.showInformationMessage("🧠 CodeWhiz v1.1 loaded with retry + inline mode!"); // Show success message 🎉
}

async function getCommentFromGemini(code) {
    // Create the initial prompt ✍️
    const prompt = `You are a strict code-commenting assistant. Only add **inline comments** (4–5 words max) using emojis where necessary. DO NOT explain, DO NOT summarize, DO NOT use markdown or \`\`\`. DO NOT return the code inside triple backticks. Return only the modified code with inline comments where needed. Be brief, clear, and helpful.\n\n${code}`;

    try {
        // Call Gemini API first time 🚀
        const result = await callGemini(prompt);
        if (result) return result;

        // 🔁 Retry with stripped down backup prompt
        const retryPrompt = `Only return this code with helpful short inline comments (max 4–5 words). Use emojis. No summaries, no markdown, no backticks. Only the code.\n\n${code}`;
        const retryResult = await callGemini(retryPrompt);
        return retryResult || "// ⚠️ Gemini had a brain freeze. Try again later.";
    } catch (err) {
        // Handle Gemini API errors 💥
        console.error("💥 Gemini API Error:", err);
        return "// ❌ Error talking to Gemini.";
    }
}

async function callGemini(prompt) {
    // Get API key from settings 🔑
    let api = vscode.workspace.getConfiguration().get("codewhiz.apiKey");
    if (!api) {
        // Show missing API key error 🚫
        vscode.window.showErrorMessage("❌ Gemini API key is missing! Add it in VS Code settings (codewhiz.apiKey)");
        return null;
    }
    // Fetch Gemini API response 🌐
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${api}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    // Parse the JSON response data 📦
    const data = await res.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    // Extract the text from response ✍️
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // 🚫 Strip markdown code blocks
    text = text?.replace(/[a-z]*\n?|/gi, '').trim();

    return text || null; // Return the text or null
}

function deactivate() { } // Extension deactivation function

module.exports = { 
    activate, 
    deactivate 
};