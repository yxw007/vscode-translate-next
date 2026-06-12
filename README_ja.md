# translate-ide

日語 | [한국어](README_ko.md) | [简体中文](README_zh-CN.md) | [English](README.md)

![GitHub License](https://img.shields.io/github/license/yxw007/vscode-translate-next)

すべてのプログラマーにとって必携の VS Code 翻訳拡張です。多言語環境でも臆することなく、より集中して没入感のあるコーディングを可能にします。🚀

> 説明: 翻訳の基盤機能は [translate](https://github.com/yxw007/translate) によって提供されています

## ✨ 特性

- シンプルで使いやすい
- 複数の翻訳エンジンに対応: Google、Azure、Amazon、Baidu、DeepL、CustomEngine（完全ユーザー定義）
- 1 つの言語からさまざまな言語への翻訳に対応
- ホバー翻訳に対応
- 選択テキストを翻訳結果で置き換え可能
- ターミナルで選択したテキストの翻訳に対応
- 拡張機能詳細ページの没入型翻訳に対応

## 📋 要件

- vscode >= 1.91.0

## ⚙️ 設定

  ![alt text](./assets/images/config.jpg)

  ヒント: Google 翻訳エンジン以外を既定の翻訳エンジンとして使う場合は、先にそのエンジンの設定が必要です。使わない翻訳エンジンは設定不要です。

### Hover 対応言語 / ファイルタイプ（カスタム）

- `Translate-next.hover.extensions`
  - デフォルト: 主要なプログラミング言語の拡張子がカンマ区切りであらかじめ登録されています。既定値: `js,jsx,ts,tsx,java,py,c,h,cpp,cc,cxx,hpp,hh,hxx,rs,go,cs,php,rb,swift,kt,kts,scala,dart,lua`。
  - 使い方: 拡張子の許可リストをカンマ区切りで指定します。ドットの有無はどちらでも構いません。例: `ts,js,py` または `.ts,.js,.py`。
  - 特殊: `*` を設定すると全ファイルで hover 翻訳が有効になります。不要な token 消費につながるため非推奨です。
  - 補足: 既定の一覧に必要な拡張子がなければ、そのまま追加してください。

## 💻 対応翻訳エンジン

| name             | 対応 | 説明                                                                                           |
| ---------------- | ---- | ---------------------------------------------------------------------------------------------- |
| google           | ✔    | 本番利用可能                                                                                   |
| azure translate  | ✔    | 本番利用可能                                                                                   |
| amazon translate | ✔    | 本番利用可能                                                                                   |
| baidu            | ✔    | 本番利用可能                                                                                   |
| deepl            | ✔    | 本番利用可能                                                                                   |
| openai           | ✔    | 本番利用可能（品質はやや不安定で、プロンプト調整が難しい）                                     |
| tencent          | ✔    | 本番利用可能                                                                                   |
| yandex           |      | 対応プラットフォームの銀行口座を持っていないため未調整です。協力いただける方の支援を歓迎します |
| custom Engine    | ✔    | 本番利用可能                                                                                   |

## 🛠️ 使用方法

1. ダウンロード: [translate-ide](https://marketplace.visualstudio.com/items?itemName=yxw007.translate-ide)
2. 公式サイトでアカウント登録: [https://translate.yanxuewen.cn](https://translate.yanxuewen.cn)
3. ログイン
   ![login](./assets/images/login.gif)

### ✨ 機能プレビュー
- hover 翻訳
  ![hover](./assets/images/hover.gif)
- ターミナルで選択したテキストの翻訳
  ![translate-terminal-text](./assets/images/translate-terminal-text.gif)
  （ヒント: ショートカットが効かない場合は、下部バーのターミナル翻訳ボタンをクリックしてください）
  ![translate-terminal-shortcut-bnt](./assets/images/terminalShortcutBtn.jpg)
- 拡張機能詳細ページの没入型翻訳
  ![detail_translation](./assets/images/detail_translation.gif)
- 選択テキストの翻訳
  ![translateText](./assets/images/usage.gif)
- カスタム翻訳エンジンを追加する
  ![addCustomEngine](./assets/images/addCustomEngine.gif)
- OpenAI の使い方
  ![alt text](./assets/images/open_ai_usage.gif)


### 📹 動画チュートリアル

- [VSCode に欠かせない翻訳拡張で、より没入感のあるコーディングを](https://www.bilibili.com/video/BV1Y1zMYQEbi/?vd_source=eaea9ad794278c4e15f13efa6d046736)
- [VSCode 翻訳拡張のクイックスタート](https://www.bilibili.com/video/BV1eVzZYoEkf/?vd_source=eaea9ad794278c4e15f13efa6d046736)

### ⌨️ ショートカット

| 説明                               | ショートカット                                             |
| ---------------------------------- | ---------------------------------------------------------- |
| 選択テキストを翻訳結果で置換       | Shift + Alt + T                                            |
| 翻訳先言語を切り替え               | Ctrl + Alt + Shift + L (Mac os: Command + Alt + Shift + L) |
| 既定の翻訳エンジンを切り替え       | Alt + Shift + E                                            |
| 拡張機能の出力ログを表示           | Ctrl + Alt + Shift + O (Mac os: Command + Alt + Shift + O) |
| 拡張機能の出力ログをクリア         | Ctrl + Alt + C (Mac os: Command + Alt + C)                 |
| ターミナルで選択したテキストを翻訳 | Ctrl + Alt + ` (Mac os: Command + Alt + `)                 |
| ターミナル翻訳ログをクリア         | Alt + C                                                    |
| ターミナル翻訳パネルを開く         | Alt + Shift + O                                            |
| hover 翻訳の有効 / 無効切り替え    | Ctrl + Alt + E                                             |

ヒント: ショートカットが環境と競合する場合は、VS Code 側で変更してください。忘れた場合でも、下部のステータスバーから翻訳先言語と既定の翻訳エンジンを切り替えられます。

![alt text](./assets/images/image.png)

### カスタム翻訳エンジン設定

- `Translate-next.customEngines`
  - 用途: 1 つ以上のカスタム翻訳エンジンを設定できます。
  - 言語 code 参考: `en`、`ja`、`zh` などの ISO 639 値は [Wikipedia: List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) を参照してください。
  - 補足: `zh-CN` のような値が必要な場合は、基本言語 code の後ろに地域サフィックスを付けてください。

設定手順:

1. VS Code の設定で `Translate-next.customEngines` を検索します。
2. オブジェクトを追加し、`name`、`apiUrl`、`method`、`toLanguages` を入力します。
3. API に応じて `body`、`query`、`headers` を設定します。
4. `body`、`query`、`headers` では `{{from}}`、`{{to}}`、`{{text}}` プレースホルダーが使えます。
5. 応答 JSON のネストされた場所に翻訳結果がある場合は `responsePath` を設定します。例: `response`、`data.translation`、`choices[0].message.content`。
6. 設定完了後、`defaultEngine` を設定したカスタムエンジン名に切り替えます。

主なフィールド:

- `name`: 一意のカスタムエンジン名。
- `apiUrl`: API エンドポイント。
- `method`: `GET` または `POST`。
- `headers`: リクエストヘッダー。
- `query`: URL クエリパラメーター。
- `body`: リクエストボディ。
- `responsePath`: 応答 JSON から翻訳結果を取り出すパス。`choices[0].message.content` のような配列表記にも対応します。
- `fromLanguages`: 翻訳元言語マップ。キーは言語名、値は言語 code です。
- `toLanguages`: 翻訳先言語マップ。キーは言語名、値は言語 code です。
- `batchStrategy`: 複数テキスト送信モード。`none`、`join`、`array` をサポートします。
- `joinDelimiter`: `batchStrategy=join` の場合の区切り文字。
- `timeout`: リクエストのタイムアウト時間（ミリ秒）。

例:

```json
"Translate-next.customEngines": [
  {
    "enabled": true,
    "name": "my-ollama",
    "apiUrl": "http://localhost:11434/api/generate",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": {
      "model": "translategemma:4b",
      "prompt": "Translate {{text}} from {{from}} to {{to}}",
      "stream": false
    },
    "responsePath": "response",
    "fromLanguages": {
      "Chinese": "zh",
      "English": "en",
      "Japanese": "ja",
      "Korean": "ko"
    },
    "toLanguages": {
      "Chinese": "zh",
      "English": "en",
      "Japanese": "ja",
      "Korean": "ko"
    },
    "timeout": 30000
  }
]
```

応答例:

```json
{
  "response": "Hello, world!"
}
```

この種の API は `responsePath: "response"` を設定すれば利用できます。

Chat Completions 形式の API 例:

```json
{
  "name": "siliconflow-chat",
  "apiUrl": "https://api.siliconflow.cn/v1/chat/completions",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer sk-xxxx",
    "Content-Type": "application/json"
  },
  "body": {
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "messages": [
      {
        "role": "user",
        "content": "次のテキストを英語に翻訳してください: {{text}}"
      }
    ]
  },
  "responsePath": "choices[0].message.content",
  "toLanguages": {
    "English": "en"
  }
}
```

## ❓ FAQ

1. `fetch failed` エラーのポップアップが出る
   ![alt text](./assets/images/error-1.png)

   > 答え: 既定の翻訳エンジンを変更していない場合は Google を使っています。その状態で PC から Google にアクセスできないと、このエラーが表示されます。

2. 他の翻訳エンジンのキーはどう取得しますか？

   > 答え: [translate ドキュメント](https://github.com/yxw007/translate) のエンジン設定部分を参照してください。

3. Baidu 翻訳のよくあるエラー

   | エラーコード | 意味           | 解決方法                                                           |
   | ------------ | -------------- | ------------------------------------------------------------------ |
   | 52003        | 未認証ユーザー | `appid` が正しいか、サービスが有効化されているか確認してください。 |
   | 54003        | アクセス制限   | 汎用テキスト翻訳が有効で、ドメイン翻訳が未設定の可能性があります。 |

   > その他のエラーコードは [エラーコード一覧](https://api.fanyi.baidu.com/doc/22) を参照してください。

4. ショートカットが効かない場合は？

   - 可能性 1: VS Code 内のショートカットと競合しているため、競合するものを変更してください。
   - 可能性 2: 外部ソフトのショートカットと競合しているため、外部ソフトを順に終了して原因を切り分けてください。
   - 隠し機能:
     - エディタ画面では右クリックで選択テキストの翻訳置換ができます。
       ![alt text](./assets/images/right-click-translate.gif)
     - ターミナル選択テキスト翻訳は設定から有効化し、下部バーに表示できます。
       ![alt text](./assets/images/click-bottom-translate-bar.gif)

5. 翻訳文字数の大量消費を避けるには？

   - キャッシュ時間を長くする
     ![alt text](./assets/images/add-cache-time.png)
   - 必要な翻訳機能だけを有効にする
     ![alt text](./assets/images/custom-feature.png)
   - 大量のテキストを選択したまま hover しないようにしてください。hover 翻訳が有効だと、文字数消費が急増する可能性があります。

## 💖 サポート

このツールが時間の節約や作業効率の向上に役立っている場合は、継続的な開発と保守のため、次の方法で支援していただけると嬉しいです。

- GitHub Sponsors でスポンサーになる: https://github.com/sponsors/yxw007

- コーヒーをごちそうしてください ☕。いただいた支援は継続的な改善と新機能の追加に活用します。

  ![alt text](./assets/images/give_a_reward.jpg)

- Bilibili の動画をフォローして応援する: [向往自由的码](https://space.bilibili.com/3546754775517426?spm_id_from=333.788.0.0)
- GitHub で Star を付けたり、周囲の開発者にこの拡張を紹介したりしていただけるのも大きな励みになります。

すべての支援に感謝しています。いただいた応援は機能改善とテストの優先度向上に活かします。要望や提案があれば、Issue やメッセージでご連絡ください。

## 📢 さらに詳しく

- 他の翻訳エンジンの設定については [translate README](https://github.com/yxw007/translate/blob/master/README_zh-CN.md) を参照してください
- 解決方法が分からない問題があれば、メッセージ、WeChat（`aa4790139`）、Issue で連絡できます

## 📄 ライセンス

translate-ide は MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) を参照してください。
