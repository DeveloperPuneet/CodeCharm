# CodeCharm 🧠✨

**CodeCharm** is an AI-powered inline comment and code readability extension for Visual Studio Code, powered by Google's Gemini models. It helps you:

* ✍️ Add short inline comments with emojis to selected code
* ♻️ Improve code readability with clean, structured refactors

---

## 🚀 Features

* ⚡ **Ctrl + Win + J** → Add short inline comments with emojis (strict, concise, meaningful)
* 📘 **Ctrl + Win + G** → Refactor code for improved readability (clear variable names, structure)
* 💾 Gemini API model fallback: automatically uses backup model if primary fails
* 🧠 Dual mode: "comment" & "readability"

---

## 📦 Installation

1. Download `.vsix` package:

   ```bash
   vsce package
   ```
2. Install in VS Code:

   ```bash
   code --install-extension CodeCharm-x.x.x.vsix
   ```

---

## 🔐 API Usage & Model Fallback

* Primary model: `gemini-2.0-flash-lite`
* Fallback model: `gemini-2.0-flash`

If the primary model is rate-limited or fails, CodeCharm will retry using the backup model seamlessly.

---

## 🧪 Usage

1. Select any code block
2. Press `Ctrl + Win + J` for inline comments ✍️
3. Or press `Ctrl + Win + G` for readability suggestions 📘

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

---

## 📄 License

Licensed under MIT.

---

## 🌐 Publisher Info

Made by [DeveloperPuneet](https://github.com/DeveloperPuneet) — I build extensions and websites with AI magic 🔮

Marketplace: [https://marketplace.visualstudio.com/items?itemName=DeveloperPuneet.CodeCharm](https://marketplace.visualstudio.com/items?itemName=DeveloperPuneet.CodeCharm)
