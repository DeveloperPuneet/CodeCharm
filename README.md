# 🧠 CodeCharm — AI-Powered Code Comment Generator for VS Code

CodeCharm is your intelligent VS Code extension that generates **inline code comments** using Google Gemini models. It uses your selected code and enhances it with **emoji-rich, concise comments** or **refactors it for readability**.

> 🚀 Now updated with **multi-model fallback support** and **secure API key input**!

<p align="center">
  <img src="https://img.shields.io/visual-studio-marketplace/v/DeveloperPuneet.codecharm?color=brightgreen&label=VS%20Marketplace" alt="Version"/>
  <img src="https://img.shields.io/visual-studio-marketplace/i/DeveloperPuneet.codecharm?color=blue" alt="Installs"/>
  <img src="https://img.shields.io/visual-studio-marketplace/d/DeveloperPuneet.codecharm?color=blueviolet" alt="Downloads"/>
  <img src="https://img.shields.io/visual-studio-marketplace/r/DeveloperPuneet.codecharm?color=yellow" alt="Rating"/>
  <img src="https://img.shields.io/github/stars/DeveloperPuneet/CodeCharm?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/license/DeveloperPuneet/CodeCharm" alt="License"/>
</p>

---

## 🌟 Features

- ✍️ Generate **inline code comments** with emojis — clean and fun.
- ♻️ Refactor messy code to improve readability.
- ⌨️ **Shortcut support**:
  - `Ctrl + Win + J` → Add Inline Comments
  - `Ctrl + Win + G` → Refactor Code
- 🔁 **Model Fallback Support**: Uses the following Gemini models in this order:
  1. `gemini-2.0-flash-lite`
  2. `gemini-2.0-flash`
  3. `gemini-2.5-flash-lite`
  4. `gemini-2.5-pro`
- 🔐 **Secure API Key Storage** in VS Code settings.
- 🧠 Uses your **own API key**, no sharing required.

---

## 🔑 Setup — Add Your API Key

To use CodeCharm, you'll need your **own Google Gemini API key**:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Copy your API key.
3. Open VS Code.
4. Press `Ctrl + Win + J` or `Ctrl + Win + G` for the first time.
5. A secure input box will appear → paste your key there.
6. It will be saved automatically in:  
   **`CodeCharm.zetaFlux`** in your VS Code settings.

> 🔐 Your key stays local & secure — not shared or stored remotely.

---

## 🚀 How to Use

1. Select a block of code.
2. Press:
   - `Ctrl + Win + J` → for inline comments
   - `Ctrl + Win + G` → to refactor code
3. CodeCharm will generate and replace your selection with an improved version.

---

## 🧪 Example Output

### Before:
```js
function getUser(id) {
  return db.query("SELECT * FROM users WHERE id = " + id);
}
```

## After (Ctrl + Win + J):
```js
function getUser(id) {
  return db.query("SELECT * FROM users WHERE id = " + id); // 🧑‍💻 Query user by ID
}
```

## 📦 Extension Info

- 📁 **Extension ID**: `CodeCharm`
- 👨‍💻 **Publisher**: [`DeveloperPuneet`](https://github.com/DeveloperPuneet)
- 🔗 **GitHub Repo**: [CodeCharm](https://github.com/DeveloperPuneet/CodeCharm)
- 🧩 **VS Code Version**: `^1.50.0` and above
- 🧠 **AI Models Used**:
  - `gemini-2.0-flash-lite` (primary)
  - `gemini-2.0-flash`
  - `gemini-2.5-flash-lite`
  - `gemini-2.5-pro`

## 🛟 Troubleshooting

- ❌ **Getting No Output or Errors?**
  - Make sure your Gemini API key is valid.
  - If it's missing or expired, you'll be prompted to input it when you try using the extension.
  - To manually update or check your key:  
    `Settings → Extensions → CodeCharm → zetaFlux`

- ⚠️ **Network Errors?**
  - Check your internet connection or if Google's Gemini API is reachable.
  - Avoid hammering it with hundreds of requests/minute — Google don’t play 😬

## 🧤 Contributions

- 💬 Ideas, feature requests, and PRs are all welcome!
- Fork it, star it ⭐, break it, rebuild it — just don’t write spaghetti 🍝
- All feedback = good feedback, especially with emojis.

## 📜 License

**MIT** — Use it, hack it, improve it.  
You break it, you own it. 💥

> 💬 Built with brain, bugs & caffeine by [@DeveloperPuneet](https://github.com/DeveloperPuneet)  
> *“If your code can’t explain itself, at least let it drop some emoji bars 🎯.”*
