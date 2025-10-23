const vscode = require('vscode'); // Import VS Code module 💻
const fetch = require('node-fetch'); // Import node-fetch library 🌐

const primaryModel = "gemini-2.0-flash-lite"; // Primary model choice 🧠
const fallbackModels = [ // Fallback model options 🔄
    "gemini-2.0-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-pro",
    "gemini-2.0-flash-exp",
    "learnlm-2.0-flash-experimental",
    "gemini-2.0-flash-live",
    "gemini-2.5-flash-live",
    "gemini-2.5-flash-native-audio-dialog"
];

// 🔐 Prompt user to enter API key
async function getOrPromptAPIKey() {
    let apiKey = vscode.workspace.getConfiguration().get("CodeCharm.zetaFlux"); // Get API key from config ⚙️
    if (!apiKey) {
        const userInput = await vscode.window.showInputBox({ // Show input box prompt ⌨️
            prompt: "Enter your Gemini API Key", // User input prompt ❓
            ignoreFocusOut: true, // Keep focus on box
            placeHolder: "Paste your key here...", // Placeholder text 📝
            password: true // Hide input characters 🙈
        });

        if (userInput) {
            await vscode.workspace.getConfiguration().update("CodeCharm.zetaFlux", userInput, vscode.ConfigurationTarget.Global); // Save API key 💾
            vscode.window.showInformationMessage("✅ API Key saved successfully!"); // Success message 🥳
            apiKey = userInput;
        } else {
            vscode.window.showErrorMessage("❌ API Key is required."); // Error message 😠
        }
    }
    return apiKey;
}

// 🧠 Activate Extension
async function activate(context) {
    const commentCommand = vscode.commands.registerCommand('CodeCharm.commentFunction', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return; // Return if no editor

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showInformationMessage("No code selected!"); // Show message
            return;
        }

        const comment = await getCommentFromGemini(selectedText, "comment"); // Get comment from Gemini
        if (!comment) {
            vscode.window.showErrorMessage("Gemini comment failed."); // Show error message
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, comment); // Replace with comment
        });
    });

    const readableCommand = vscode.commands.registerCommand('CodeCharm.suggestReadableCode', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return; // If no editor open

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showInformationMessage("No code selected!"); // No code selected error
            return;
        }

        const readableCode = await getCommentFromGemini(selectedText, "readability"); // Get readability code
        if (!readableCode) {
            vscode.window.showErrorMessage("Gemini readability failed."); // Gemini readability failed
            return;
        }

        editor.edit(editBuilder => {
            editBuilder.replace(selection, readableCode); // Replace selected code
        });
    });

    const setApiKeyCommand = vscode.commands.registerCommand('CodeCharm.setApiKey', async function () {
        const userInput = await vscode.window.showInputBox({
            prompt: "Enter your Gemini API Key",
            ignoreFocusOut: true,
            placeHolder: "Paste your key here...",
            password: true
        });

        if (userInput) {
            await vscode.workspace.getConfiguration().update("CodeCharm.zetaFlux", userInput, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage("✅ API Key saved successfully!");
        } else {
            vscode.window.showErrorMessage("❌ API Key is required.");
        }
    });

    context.subscriptions.push(commentCommand, readableCommand, setApiKeyCommand); // Add subscriptions to context

    vscode.window.showInformationMessage("💫 CodeCharm loaded!"); // Show startup message
}

Additional_functionalies = `Before doing anything, check if the provided code contains a pattern like cmd(...); if found, treat the text inside cmd() as an instruction to modify the code first (for example, cmd(import pandas library) means you should add "import pandas as pd" at the top). If no cmd() is found, do not print any messages or placeholders—simply continue processing the code silently.`

// 🧠 Get Gemini Comment or Refactor
async function getCommentFromGemini(code, mode = "comment") {
    let prompt = mode === "comment"
        ? `You are a strict code-commenting assistant. Only add inline comments (4–5 words max) using emojis. Do NOT explain or return markdown. Return ONLY the modified code. ${Additional_functionalies} \n\n${code}`
        : `Refactor this code for readability. Rename unclear variables, break down complex parts. DO NOT return explanation. ONLY the cleaned code. ${Additional_functionalies} \n\n${code}`;

    const apiKey = await getOrPromptAPIKey();
    if (!apiKey) return null;

    let models = [primaryModel, ...fallbackModels]; // All model choices

    for (const model of models) {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await res.json(); // Parse the response
            let text = data.candidates?.[0]?.content?.parts?.[0]?.text; // Get the text part
            text = text?.replace(/```[\s\S]*?```/g, match => {
                return match.replace(/```[a-zA-Z]*\n?/, '').replace(/```/, '');
            }).trim();

            if (text) return text;
        } catch (e) {
            console.warn(`⚠️ ${model} failed. Trying next...`); // Log model failure
        }
    }

    return null; // Return if no text
}

function deactivate() {} // Let him rest 😴

module.exports = { // Export module 📦
    activate, // Activate function 🚀
    deactivate // Deactivate function 😴
};
