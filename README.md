# vscode-translate-next 

English | [简体中文](./README_zh-CN.md)

![GitHub top language](https://img.shields.io/github/languages/top/yxw007/vscode-translate-next)
![GitHub License](https://img.shields.io/github/license/yxw007/vscode-translate-next)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yxw007/vscode-translate-next/release.yml)

Quickly translate texts in batches to make internationalization easier 🚀

> Note: Underlying translation support provided by [translate](https://github.com/yxw007/translate)

## ✨ Features

- Simple and easy to use
- Support for multiple translation engines: Google, Azure, Amazon, Baidu, etc
- Support for translation from one language to any language
- Support hover translate

## 📋 Requirements

- vscode >= 1.91.0

## ⚙️ Config
  ![alt text](assets/images/config.jpg)

  Tips: In addition to the Google Translate engine, if you set other translation engines as the default translation engine, you need to configure the corresponding translation engine configuration, if other translation engines do not use it, you can do without configuration

## 💻Supported Translation Engines  

| Name             | Support | Description                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| google           | √       | Commissioned and ready for use                                                                                                                            |
| azure translate  | √       | Commissioned and ready for use                                                                                                                            |
| amazon translate | √       | Commissioned and ready for use                                                                                                                            |
| baidu            | √       | Commissioned and ready for use                                                                                                                            |
| deepl            | √       | Commissioned and ready for use                                                                                                                            |
| yandex           |         | I have not tuned in as I do not have a bank account supported by the platform (help from those who are in a position to do so is welcome and appreciated) |

## 🛠️ Usage

Download：[vscode-translate-next](https://marketplace.visualstudio.com/items?itemName=yxw007.vscode-translate-next)

![translateText](assets/images/usage.gif)
![hover](assets/images/hover.gif)

### ⌨️ Shortcut key

| Description                                                         | Shortcut key          |
| ------------------------------------------------------------------- | --------------------- |
| The translation is selected from source language to Target language | Shift + Alt + T       |
| Switch the target language                                          | Ctrl + Alt + Shit + L |
| Switch the default translation engine                               | Alt + Shit + E        |

Tip: If your editor environment has conflicting shortcuts, you can modify and adjust them yourself. If you forget the shortcut keys, you can use the status bar button provided in the bottom status bar to switch between the target language and the default translation engine, as shown in the following figure:

![alt text](assets/images/image.png)

## 📢 More

This plugin has been used normally, everyone is welcome to experience, if you have any questions and suggestions, you can send me an issue to give feedback.
If you are interested, you are especially welcome to join us, and let's improve this tool together.
Help to click star ⭐, let more people know about this tool, thank you 🙏

## 🙏 Special thanks
- [vscode-comment-translate](https://github.com/intellism/vscode-comment-translate)：The provided hover implementation

## 📄 License

vscode-translate-next is released under the MIT license. for more information, see the [LICENSE](./LICENSE) file.
