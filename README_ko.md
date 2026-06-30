# vscode-translate-next

한국어 | [日語](README_ja.md) | [简体中文](README.md) | [English](README_en.md)

![GitHub License](https://img.shields.io/github/license/yxw007/vscode-translate-next)

모든 프로그래머에게 꼭 필요한 VS Code 번역 확장입니다. 여러 언어 환경에서도 부담 없이 작업할 수 있어, 더 몰입해서 코드를 작성할 수 있습니다. 🚀

> 안내: 기본 번역 기능은 [translate](https://github.com/yxw007/translate) 에서 제공합니다

## ✨ 특징

- 간단하고 사용하기 쉽습니다
- 다양한 번역 엔진을 지원합니다: Google, Azure, Amazon, Baidu, DeepL, CustomEngine(완전 사용자 정의)
- 하나의 언어에서 다양한 언어로 번역할 수 있습니다
- hover 번역을 지원합니다
- 확장 상세 페이지 몰입형 번역을 지원합니다
- markdown 미리보기 몰입형 번역을 지원합니다
- 터미널에서 선택한 텍스트 번역을 지원합니다
- 선택한 텍스트를 번역 결과로 바꿀 수 있습니다

## 📋 요구 사항

- vscode >= 1.91.0

## ⚙️ 설정

  ![alt text](./assets/images/config.jpg)

  팁: Google 번역 엔진은 추가 설정 없이 사용할 수 있습니다. 다른 엔진을 기본 번역 엔진으로 지정하려면 해당 엔진 설정을 먼저 완료해야 합니다. 사용하지 않는 엔진은 설정할 필요가 없습니다.

### Hover 지원 언어 / 파일 형식(사용자 정의)

- `Translate-next.hover.extensions`
  - 기본값: 주요 프로그래밍 언어 파일 확장자 목록이 쉼표로 구분되어 내장되어 있습니다. 기본값: `js,jsx,ts,tsx,java,py,c,h,cpp,cc,cxx,hpp,hh,hxx,rs,go,cs,php,rb,swift,kt,kts,scala,dart,lua`.
  - 사용법: 확장자 허용 목록을 쉼표로 구분해 입력합니다. 점(`.`)은 있어도 되고 없어도 됩니다. 예: `ts,js,py` 또는 `.ts,.js,.py`.
  - 특수: `*` 로 설정하면 모든 파일에 hover 번역이 활성화됩니다. 불필요한 token 소모가 발생할 수 있어 권장하지 않습니다.
  - 참고: 기본 목록에 원하는 확장자가 없으면 그대로 뒤에 추가하면 됩니다.

## 💻 지원되는 번역 엔진

| name             | 지원 | 설명                                                                                            |
| ---------------- | ---- | ----------------------------------------------------------------------------------------------- |
| google           | ✔    | 실사용 가능한 상태입니다                                                                        |
| azure translate  | ✔    | 실사용 가능한 상태입니다                                                                        |
| amazon translate | ✔    | 실사용 가능한 상태입니다                                                                        |
| baidu            | ✔    | 실사용 가능한 상태입니다                                                                        |
| deepl            | ✔    | 실사용 가능한 상태입니다                                                                        |
| openai           | ✔    | 실사용 가능한 상태입니다 (결과 품질이 다소 아쉽고 프롬프트 조정이 어렵습니다)                   |
| tencent          | ✔    | 실사용 가능한 상태입니다                                                                        |
| yandex           |      | 플랫폼에서 지원하는 은행 계좌가 없어 아직 설정하지 못했습니다. 가능하신 분의 도움을 환영합니다. |
| custom Engine    | ✔    | 실사용 가능한 상태입니다                                                                        |

## 🛠️ 사용 방법

1. 다운로드: [vscode-translate-next](https://marketplace.visualstudio.com/items?itemName=yxw007.vscode-translate-next)
2. 공식 사이트에서 계정 등록: [https://translate.yanxuewen.cn](https://translate.yanxuewen.cn)
3. 로그인
   ![login](./assets/images/login.gif)

### ✨ 기능 미리보기
- hover 번역
  ![hover](./assets/images/hover.gif)
- 터미널에서 선택한 텍스트 번역
  ![translate-terminal-text](./assets/images/translate-terminal-text.gif)
  (팁: 단축키가 동작하지 않으면 하단 바의 터미널 텍스트 번역 버튼을 클릭하세요.)
  ![translate-terminal-shortcut-bnt](./assets/images/terminalShortcutBtn.jpg)
- 확장 상세 페이지 몰입형 번역
  ![detail_translation](./assets/images/detail_translation.gif)
- markdown 미리보기 몰입형 번역
  ![markdown-preview-translate](./assets/images/markdown-preview-translate.gif)
- 선택한 텍스트 번역
  ![translateText](./assets/images/usage.gif)
- 사용자 정의 번역 엔진을 추가합니다.
  ![addCustomEngine](./assets/images/addCustomEngine.gif)
- OpenAI 사용 방법
  ![alt text](./assets/images/open_ai_usage.gif)

### 📹 영상 튜토리얼

- [VSCode 필수 번역 확장으로 더 몰입감 있게 코딩하기](https://www.bilibili.com/video/BV1Y1zMYQEbi/?vd_source=eaea9ad794278c4e15f13efa6d046736)
- [VSCode 번역 확장 빠른 시작](https://www.bilibili.com/video/BV1eVzZYoEkf/?vd_source=eaea9ad794278c4e15f13efa6d046736)

### ⌨️ 단축키

| 설명                            | 단축키                                                     |
| ------------------------------- | ---------------------------------------------------------- |
| 선택한 텍스트를 번역으로 바꾸기 | Shift + Alt + T                                            |
| 대상 언어 전환                  | Ctrl + Alt + Shift + L (Mac os: Command + Alt + Shift + L) |
| 기본 번역 엔진 전환             | Alt + Shift + E                                            |
| 확장 출력 로그 보기             | Ctrl + Alt + Shift + O (Mac os: Command + Alt + Shift + O) |
| 확장 출력 로그 지우기           | Ctrl + Alt + C (Mac os: Command + Alt + C)                 |
| 터미널에서 선택한 텍스트 번역   | Ctrl + Alt + ` (Mac os: Command + Alt + `)                 |
| 터미널 번역 로그 지우기         | Alt + C                                                    |
| 터미널 번역 패널 열기           | Alt + Shift + O                                            |
| hover 번역 활성화 / 비활성화    | Ctrl + Alt + E                                             |

팁: 편집기 환경과 단축키가 충돌하면 VS Code 에서 직접 변경할 수 있습니다. 단축키를 잊어버렸더라도 하단 상태 표시줄 버튼으로 대상 언어와 기본 번역 엔진을 전환할 수 있습니다.

![alt text](./assets/images/image.png)

### 사용자 정의 엔진 설정

- `Translate-next.customEngines`
  - 용도: 설정에서 하나 이상의 사용자 정의 번역 엔진을 구성합니다.
  - 언어 code 참고: `en`, `ja`, `zh` 같은 ISO 639 값은 [Wikipedia: List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) 를 참고하세요.
  - 참고: `zh-CN` 같은 값이 필요하면 기본 언어 code 뒤에 지역 접미사를 붙이면 됩니다.

설정 단계:

1. VS Code 설정에서 `Translate-next.customEngines` 를 검색합니다.
2. 객체를 추가하고 `name`, `apiUrl`, `method`, `toLanguages` 를 입력합니다.
3. API 요구 사항에 따라 `body`, `query`, `headers` 를 설정합니다.
4. `body`, `query`, `headers` 에서 `{{from}}`, `{{to}}`, `{{text}}` 플레이스홀더를 사용할 수 있습니다.
5. 번역 결과가 JSON 의 특정 필드 안에 있으면 `responsePath` 를 설정합니다. 예: `response`, `data.translation`, `choices[0].message.content`.
6. 설정을 저장한 뒤 `defaultEngine` 을 구성한 사용자 정의 엔진 이름으로 변경합니다.

주요 필드:

- `name`: 고유한 사용자 정의 엔진 이름입니다.
- `apiUrl`: API 주소입니다.
- `method`: `GET` 또는 `POST`.
- `headers`: 요청 헤더입니다.
- `query`: URL 쿼리 파라미터입니다.
- `body`: 요청 본문입니다.
- `responsePath`: 응답 JSON 에서 번역 결과를 읽는 경로입니다. `choices[0].message.content` 같은 배열 경로도 지원합니다.
- `fromLanguages`: 원문 언어 매핑입니다. key 는 언어 이름이고 value 는 언어 code 입니다.
- `toLanguages`: 대상 언어 매핑입니다. key 는 언어 이름이고 value 는 언어 code 입니다.
- `batchStrategy`: 여러 텍스트 전송 방식입니다. `none`, `join`, `array` 를 지원합니다.
- `joinDelimiter`: `batchStrategy=join` 일 때 사용하는 구분자입니다.
- `timeout`: 요청 타임아웃이며 단위는 밀리초입니다.

예시:

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

응답 예시:

```json
{
  "response": "Hello, world!"
}
```

이런 API 는 `responsePath: "response"` 로 설정하면 됩니다.

Chat Completions 스타일 API 예시:

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
        "content": "다음 텍스트를 영어로 번역해 주세요: {{text}}"
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

1. `fetch failed` 오류 팝업이 뜹니다
   ![alt text](./assets/images/error-1.png)

   > 답변: 기본 엔진을 바꾸지 않았다면 Google 을 사용 중입니다. 이때 컴퓨터에서 Google 에 접근할 수 없으면 이 오류가 발생합니다.

2. 다른 번역 엔진의 키는 어떻게 얻나요?

   > 답변: [translate 문서](https://github.com/yxw007/translate) 의 엔진 설정 부분을 참고하세요.

3. Baidu 번역 관련 자주 발생하는 오류

   | 오류 코드 | 의미                 | 해결 방법                                                                 |
   | --------- | -------------------- | ------------------------------------------------------------------------- |
   | 52003     | 인증되지 않은 사용자 | `appid` 가 올바른지, 서비스가 활성화되어 있는지 확인하세요.               |
   | 54003     | 접근 제한            | 일반 텍스트 번역이 활성화되어 있고 도메인 번역 서비스가 아닐 수 있습니다. |

   > 더 많은 오류 코드는 [오류 코드 목록](https://api.fanyi.baidu.com/doc/22) 을 확인하세요.

4. 단축키가 동작하지 않으면 어떻게 하나요?

   - 가능성 1: VS Code 내부 단축키와 충돌합니다. 충돌하는 키를 변경하세요.
   - 가능성 2: 외부 소프트웨어 단축키와 충돌합니다. 외부 프로그램을 하나씩 종료하며 충돌 원인을 찾아보세요.
   - 숨겨진 기능:
     - 편집기 화면에서 마우스 오른쪽 버튼을 클릭해 선택한 텍스트를 번역으로 바꿀 수 있습니다.
       ![alt text](./assets/images/right-click-translate.gif)
     - 터미널 선택 텍스트 번역은 설정에서 활성화하고 하단 바에 표시할 수 있습니다.
       ![alt text](./assets/images/click-bottom-translate-bar.gif)

5. 번역 문자 소모를 많이 줄이려면?

   - 캐시 시간을 늘립니다.
     ![alt text](./assets/images/add-cache-time.png)
   - 실제로 필요한 번역 기능만 켭니다.
     ![alt text](./assets/images/custom-feature.png)
   - 많은 양의 텍스트를 선택한 뒤 그 위에 hover 하지 마세요. hover 번역이 켜져 있으면 문자 소모가 빠르게 늘어날 수 있습니다.

## 💖 지원하기

이 도구가 시간을 절약하고 업무 효율을 높이는 데 도움이 되었다면, 계속해서 개발과 유지 보수를 이어갈 수 있도록 아래 방식으로 응원해 주세요.

- GitHub Sponsors 로 후원하기: https://github.com/sponsors/yxw007

- 커피 한 잔 사주기 ☕. 모든 지원은 지속적인 개선과 새로운 기능 추가에 큰 도움이 됩니다.

  ![alt text](./assets/images/give_a_reward.jpg)

- Bilibili 에서 저를 팔로우하고 영상을 응원해 주세요: [向往自由的码](https://space.bilibili.com/3546754775517426?spm_id_from=333.788.0.0)
- GitHub 에 Star 를 남기고 주변 개발자에게 이 확장을 추천해 주셔도 큰 힘이 됩니다.

모든 지원에 진심으로 감사드립니다. 보내주신 응원은 기능 개선과 테스트에 우선적으로 사용하겠습니다. 특별한 제안이나 원하는 기능이 있으면 Issue 나 메시지로 알려 주세요.

## 📢 더 알아보기

- 다른 번역 엔진 설정은 [translate README](https://github.com/yxw007/translate/blob/master/README_zh-CN.md) 를 참고하세요
- 해결 방법이 잘 떠오르지 않는 문제가 있으면 메시지를 남기거나 WeChat(`aa4790139`)으로 연락하거나 Issue 를 등록할 수 있습니다

## 📄 라이선스

vscode-translate-next 는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 를 참고하세요.
