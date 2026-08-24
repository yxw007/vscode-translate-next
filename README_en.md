# vscode-translate-next

English | [日語](README_ja.md) | [简体中文](README.md)

![GitHub License](https://img.shields.io/github/license/yxw007/vscode-translate-next)

A powerful VSCode translation extension that breaks language barriers and lets you focus on immersive coding 🚀

> Powered by [translate](https://github.com/yxw007/translate)

## ✨ Features

- **Hover Translation** — Translate on hover
  ![hover](https://translate.yanxuewen.cn/images/features/hover.gif)
- **Hover Comment Replace** — Hover and replace comments inline
  ![hover-comment-replace](https://translate.yanxuewen.cn/images/features/hover-comment-replace.gif)
- **Replace All Comments** — Batch translate all comments in your project
  ![comment-replace-all](https://translate.yanxuewen.cn/images/features/comment-replace-all.gif)
- **Translate Terminal Text** — Select text in the terminal and translate instantly
  ![translate-terminal-text](https://translate.yanxuewen.cn/images/features/translate-terminal-text.gif)
  ![translate-terminal-shortcut-bnt](./assets/images/terminalShortcutBtn.jpg)
- **Extension Details Immersive Translation** — Read foreign-language extensions with ease
  ![detail_translation](https://translate.yanxuewen.cn/images/features/detail_translation.gif)
- **Markdown Preview Immersive Translation** — Translate documents while previewing
  ![markdown-preview-translate](https://translate.yanxuewen.cn/images/features/markdown-preview-translate.gif)
- **Selected Text Translation** — Select any text and translate on the fly
  ![translateText](https://translate.yanxuewen.cn/images/features/text-replace-translate.gif)
- **Custom Translation Engine** — Bring your own translation service
  ![addCustomEngine](https://translate.yanxuewen.cn/images/features/addCustomEngine.gif)


## 📋 Requirements

- vscode >= 1.91.0

### ⚙️ Configure Translation Engine

  ![alt text](./assets/images/config.jpg)

> Google and Bing work out of the box. For other engines, configure your API keys in settings.

### 📝 Tutorials
- [Configure Baidu Translation](./course/zh/config-engine/baidu.md)
- [Configure Tencent Translation](./course/zh/config-engine/tencent.md)
- [Configure Custom Translation Engine](./course/zh/config-engine/custom.md) (DeepSeek, Zhipu, Qwen, Xiaomi MiMo)

> Keys shown in tutorials are for demonstration only — all have expired.

### 🎬 Video Tutorials

- [A Must-Have VS Code Extension for Immersive Coding](https://www.bilibili.com/video/BV1Y1zMYQEbi/?vd_source=eaea9ad794278c4e15f13efa6d046736)
- [Quick Start Guide for VS Code Translation Extension](https://www.bilibili.com/video/BV1eVzZYoEkf/?vd_source=eaea9ad794278c4e15f13efa6d046736)

### 🖱️ Hover Scope (Customizable)

Controlled by `Translate-next.hover.extensions`:

- **Default**: Built-in allowlist of mainstream programming languages — `js,jsx,ts,tsx,java,py,c,h,cpp,cc,cxx,hpp,hh,hxx,rs,go,cs,php,rb,swift,kt,kts,scala,dart,lua`
- **Usage**: Comma-separated, with or without dots, e.g. `ts,js,py` or `.ts,.js,.py`
- **Special**: Set to `*` to enable hover on all files (not recommended, may cause unnecessary token usage)
- **Note**: If your extension isn't in the default list, just append it

## 💻 Supported Translation Engines

| Engine           | Pricing               | Rating | Description                                         |
| ---------------- | --------------------- | ------ | --------------------------------------------------- |
| Google           | Free                  | ⭐⭐⭐⭐   | Great results, requires access to Google            |
| Bing             | Free                  | ⭐⭐⭐⭐   | No network restrictions, ready to use, a bit slow   |
| Azure Translate  | 2M chars/month free   | ⭐⭐⭐⭐⭐  | Great results, fast                                 |
| Amazon Translate | 2M chars/month free   | ⭐⭐⭐⭐⭐  | Great results, fast                                 |
| Baidu            | 1M chars/month free   | ⭐⭐⭐⭐⭐  | Great results, fast                                 |
| DeepL            | 500K chars/month free | ⭐⭐⭐⭐⭐  | Great results, fast, lower free quota               |
| Tencent          | 5M chars/month free   | ⭐⭐⭐⭐   | No longer recommended, service ends 2026/07/31      |
| Custom Engine    | Fully customizable    | ⭐⭐⭐    | Depends on your API, recommended: DeepSeek-v4-flash |

## 🛠️ Quick Start

1. **Install** — Get it from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=yxw007.vscode-translate-next)
2. **Register** — Create an account at [translate.yanxuewen.cn](https://translate.yanxuewen.cn)
3. **Sign in**
   ![login](./assets/images/login.gif)

### ⌨️ Shortcuts

| Action                                 | Windows/Linux            | macOS                   |
| -------------------------------------- | ------------------------ | ----------------------- |
| Replace selected text with translation | `Shift + Alt + T`        | `Shift + Alt + T`       |
| Switch target language                 | `Ctrl + Alt + Shift + L` | `Cmd + Alt + Shift + L` |
| Switch default translation engine      | `Alt + Shift + E`        | `Alt + Shift + E`       |
| View extension logs                    | `Ctrl + Alt + Shift + O` | `Cmd + Alt + Shift + O` |
| Clear extension logs                   | `Ctrl + Alt + C`         | `Cmd + Alt + C`         |
| Translate terminal selected text       | `Ctrl + Alt + `` `       | `Cmd + Alt + `` `       |
| Clear terminal translation logs        | `Alt + C`                | `Alt + C`               |
| Open terminal translation panel        | `Alt + Shift + O`        | `Alt + Shift + O`       |
| Enable/disable hover translation       | `Ctrl + Alt + E`         | `Ctrl + Alt + E`        |

> Shortcuts conflict? Adjust them in VS Code. You can also use the status bar buttons to switch language and engine:

![alt text](./assets/images/image.png)


## ❓ FAQ

### 1. `fetch failed` Error

![alt text](./assets/images/error-1.png)

> **Answer**: If you haven't changed the default engine, Google is used. When your network can't reach Google, this error appears. Switch to another engine.

### 2. How Do I Get Keys for Other Engines?

> **Answer**: Check the [translate docs](https://github.com/yxw007/translate) for each engine's configuration guide.

### 3. Shortcuts Not Working?

- **Cause 1**: Conflicts with other VS Code shortcuts → modify the conflicting shortcut
- **Cause 2**: Conflicts with external software → exit apps one by one to identify the conflict
- **Hidden tricks**:
  - Right-click in the editor to replace selected text with translation
    ![alt text](./assets/images/right-click-translate.gif)
  - Enable terminal translation button in the bottom bar via settings
    ![alt text](./assets/images/click-bottom-translate-bar.gif)

### 4. How to Avoid Excessive Character Usage?

- **Increase cache duration** to reduce repeated translations
  ![alt text](./assets/images/add-cache-time.png)
- **Enable only the features you need**
  ![alt text](./assets/images/custom-feature.png)
- **Avoid hovering over large selections** — selecting a large block and triggering hover translation consumes characters quickly

### 5. Why doesn't the "Log In" button in the bottom bar respond when I click it?
- Possible cause: When you clicked "Log In" for the first time, you accidentally clicked "Do Not Authorize" or "Reject" in the authorization prompt that appeared.
- Solution:
  - Press `F1` in the editor -> `Manage Trusted Domains`
  - Add the plugin’s official website address to the `Trusted Domains` configuration file
    ```json
    [
      ...
      "https://translate.yanxuewen.cn",
    ]
    ```

## 💖 Support the Project

If this tool has saved you time, consider supporting continued development:

- [Become a GitHub Sponsor](https://github.com/sponsors/yxw007)
- **Buy me a coffee ☕** — every contribution helps drive improvements

  ![alt text](./assets/images/give_a_reward.jpg)

- Follow and support my videos on Bilibili: [向往自由的码](https://space.bilibili.com/3546754775517426?spm_id_from=333.788.0.0)
- **Star ⭐** the project on GitHub and share it with other developers

Thank you for your support ❤️ — it will be prioritized for new features. For suggestions or requests, open an issue or message me.

## 📢 Learn More

- For other engine configs, see the [translate README](https://github.com/yxw007/translate/blob/master/README_zh-CN.md)
- Problems? Leave a message, open an [Issue](https://github.com/yxw007/vscode-translate-next/issues), or contact me on WeChat (`aa4790139`)

## 📄 License

This project is released under the MIT License. See [LICENSE](./LICENSE) for details.
