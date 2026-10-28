# Configure a Custom Translation Engine

The point of Custom Engine is to let you define exactly what acts as your translation engine — just follow the configuration field spec and the translation API rules.

## Configure DeepSeek
1. Open [https://www.deepseek.com/](https://www.deepseek.com/) and register an account
2. Go to the API development platform
  ![](../../assets/config-engine/custom/deepseek/1.jpg)
3. Create an API key
  ![](../../assets/config-engine/custom/deepseek/2.jpg)
  ![](../../assets/config-engine/custom/deepseek/3.jpg)
  ![](../../assets/config-engine/custom/deepseek/4.jpg)

4. Configure the DeepSeek engine in the extension
   Replace the Authorization header with the API key created in step 3
   ![](../../assets/config-engine/custom/addCustomEngine.jpg)
   ![](../../assets/config-engine/custom/deepseek/6.jpg)

Configuration content:

   ```json
   ...
    "Translate-next.customEngines": [
        {
            "name": "DeepSeek-v4-flash",
            "enabled": true,
            "apiUrl": "https://api.deepseek.com/chat/completions",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "******"
            },
            "body": {
                "model": "deepseek-v4-flash",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful and precise assistant for translation, only return the translated result without any extra explanation or comment"
                    },
                    {
                        "role": "user",
                        "content": "Translate {{text}} from {{from}} to {{to}}"
                    }
                ],
                "thinking": {
                    "type": "disabled"
                },
                "stream": false,
                "type": "json_object"
            },
            "responsePath": "choices.0.message.content",
            "fromLanguages": {
                "Chinese": "Chinese",
                "English": "English",
                "Japanese": "Japanese",
                "Korean": "Korean"
            },
            "toLanguages": {
                "Chinese": "Chinese",
                "English": "English",
                "Japanese": "Japanese",
                "Korean": "Korean"
            },
            "timeout": 30000
        }
    ]
   ...
   ```

Note: `deepseek-v4-flash` is more than enough for translation — there is no need to use the more expensive `deepseek-v4-pro` model.

## Configure Zhipu
1. Open [https://bigmodel.cn/](https://bigmodel.cn/) and register an account
2. Open the console and create an API key
  ![](../../assets/config-engine/custom/gml/1.jpg)
  ![](../../assets/config-engine/custom/gml/2.jpg)
  ![](../../assets/config-engine/custom/gml/3.jpg)
  ![](../../assets/config-engine/custom/gml/4.jpg)
  ![](../../assets/config-engine/custom/gml/5.jpg)
3. Configure the Zhipu engine in the extension
  ![](../../assets/config-engine/custom/addCustomEngine.jpg)
  ![](../../assets/config-engine/custom/gml/6.jpg)

Configuration content:

  ```json
  {
			"name": "glm-v4",
			"enabled": true,
			"apiUrl": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Authorization": "******"
			},
			"body": {
				"model": "glm-5.2",
				"messages": [
					{
						"role": "system",
						"content": "You are a helpful and precise assistant for translation, only return the translated result without any extra explanation or comment"
					},
					{
						"role": "user",
						"content": "Translate {{text}} from {{from}} to {{to}}"
					}
				],
				"thinking": {
					"type": "disabled"
				},
				"stream": false,
				"type": "json_object"
			},
			"responsePath": "choices.0.message.content",
			"fromLanguages": {
				"Chinese": "Chinese",
				"English": "English",
				"Japanese": "Japanese",
				"Korean": "Korean"
			},
			"toLanguages": {
				"Chinese": "Chinese",
				"English": "English",
				"Japanese": "Japanese",
				"Korean": "Korean"
			},
			"timeout": 30000
		}
  ```

## Configure Qwen
1. Open [https://www.aliyun.com/product/qwen?utm_content=se_1023450589](https://www.aliyun.com/product/qwen?utm_content=se_1023450589) and register an account
2. Create an API key
  Shortcut: [https://bailian.console.aliyun.com/cn-beijing?spm=5176.29597918.J_F4r-7Zs_PtjrjEY48APSA.d_primary.68a5133cchGM2U&tab=model#/api-key](https://bailian.console.aliyun.com/cn-beijing?spm=5176.29597918.J_F4r-7Zs_PtjrjEY48APSA.d_primary.68a5133cchGM2U&tab=model#/api-key)
3. Configure the Qwen-plus engine in the extension
  ![](../../assets/config-engine/custom/addCustomEngine.jpg)
  ![](../../assets/config-engine/custom/qwen/1.jpg)
  ![](../../assets/config-engine/custom/qwen/2.jpg)

Configuration content:

```json
...
  "Translate-next.customEngines": [
    ...
    {
			"name": "qwen-plus",
			"enabled": true,
			"apiUrl": "https://ws-ytln9wz91b6f0f1c.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Authorization": "******"
			},
			"body": {
				"model": "qwen-plus",
				"messages": [
					{
						"role": "system",
						"content": "You are a helpful and precise assistant for translation, only return the translated result without any extra explanation or comment"
					},
					{
						"role": "user",
						"content": "Translate {{text}} from {{from}} to {{to}}"
					}
				],
				"type": "json_object"
			},
			"responsePath": "choices.0.message.content",
			"fromLanguages": {
				"Chinese": "Chinese",
				"English": "English",
				"Japanese": "Japanese",
				"Korean": "Korean"
			},
			"toLanguages": {
				"Chinese": "Chinese",
				"English": "English",
				"Japanese": "Japanese",
				"Korean": "Korean"
			},
			"timeout": 30000
		}
  ]

...
```

## Further details

### Quick configuration steps

1. Open VS Code settings and search for `Translate-next.customEngines`.
2. Add a new object and fill in `name`, `apiUrl`, `method`, `toLanguages`.
3. If the API needs a request body, configure `body`; for query parameters use `query`; for request headers use `headers`.
4. You can use the `{{from}}`, `{{to}}` and `{{text}}` placeholders inside `body`, `query` and `headers`.
5. If the result sits in a JSON field, configure `responsePath`, e.g. `response`, `data.translation` or `choices[0].message.content`.
6. After configuring, switch `defaultEngine` to the custom engine name you set.

### Common fields

- `enabled`: whether this engine is enabled; used by the engine selector. Note: the engine currently in use cannot be disabled.
- `name`: unique custom engine name.
- `apiUrl`: endpoint URL.
- `method`: `GET` or `POST`.
- `headers`: request headers.
- `query`: URL query parameters.
- `body`: request body.
- `responsePath`: path to the translated text in the response JSON. Array paths such as `choices[0].message.content` are supported, meaning the `content` of the first `message` in `choices`.
- `fromLanguages`: source language map — key is the language name, value is the language code.
- `toLanguages`: target language map — key is the language name, value is the language code.
- `batchStrategy`: optional, multi-segment request mode; supports `none`, `join`, `array`. Default: `none`.
- `joinDelimiter`: optional, the delimiter used when `batchStrategy=join`. Default: `undefined`.
- `timeout`: request timeout in milliseconds. Default: `30000`.

### Example: run a local LLM with ollama as the translation engine

Note: running a translation LLM locally requires a GPU, otherwise the results will be poor (slow and inaccurate).

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

Sample response:

```json
{
  "response": "Hello, world!"
}
```

For an API like this, `responsePath: "response"` is enough.

Once you understand these rules, you can configure any custom engine you like.
