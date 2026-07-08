# 配置自定义翻译engine

Custom Engine 的目的就是完全让用户自定义配置什么作为翻译Engine，按配置字段规范和翻译api规则来即可。

## 配置DeepSeek
1. 打开官网：[https://www.deepseek.com/](https://www.deepseek.com/)，注册账号
2. 进入Api 开发平台
  ![](../../assets/config-engine/custom/deepseek/1.jpg)
3. 创建API Key
  ![](../../assets/config-engine/custom/deepseek/2.jpg)
  ![](../../assets/config-engine/custom/deepseek/3.jpg)
  ![](../../assets/config-engine/custom/deepseek/4.jpg)
  
4. 插件配置DeepSeek Engine
   替换成第3步创建出来的Api Key
   ![](../../assets/config-engine/custom/addCustomEngine.jpg.jpg)
   ![](../../assets/config-engine/custom/deepseek/6.jpg)

具体配置内容
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
                "Authorization": "Bearer sk-bb64f3bc5a024123b4ff7dc772a14f4b"
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

补充：deepseek-v4-flash 作为翻译engine完全足够，没必要使用更贵的deepseek-v4-pro模型
  

## 配置智谱
1. 打开官网：[https://bigmodel.cn/](https://bigmodel.cn/)，注册账号
2. 进入控制台，创建Api key
  ![](../../assets/config-engine/custom/gml/1.jpg)
  ![](../../assets/config-engine/custom/gml/2.jpg)
  ![](../../assets/config-engine/custom/gml/3.jpg)
  ![](../../assets/config-engine/custom/gml/4.jpg)
  ![](../../assets/config-engine/custom/gml/5.jpg)
3. 插件配置智谱 Engine
  ![](../../assets/config-engine/custom/addCustomEngine.jpg)
  ![](../../assets/config-engine/custom/gml/6.jpg)

具体配置内容
  ```json
  {
			"name": "glm-v4",
			"enabled": true,
			"apiUrl": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Authorization": "Bearer e944648a55c24bcea191d9b56c51e129.G7aE7e1a72zn5pTX"
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


## 延展说明

### 简要配置步骤
配置步骤：
1. 打开 VS Code 设置，搜索 `Translate-next.customEngines`。
2. 新增一个对象，填写 `name`、`apiUrl`、`method`、`toLanguages`。
3. 如果接口需要请求体，就配置 `body`；如果需要 query 参数，就配置 `query`；如果需要请求头，就配置 `headers`。
4. 在 `body`、`query`、`headers` 中可以使用 `{{from}}`、`{{to}}`、`{{text}}` 占位符。
5. 如果返回结果在 JSON 的某个字段里，配置 `responsePath`，例如 `response`、`data.translation` 或 `choices[0].message.content`。
6. 配置完成后，把 `defaultEngine` 切换成你填写的自定义引擎名称即可使用。

### 常用字段解释：
- `enabled`: 是否启用此engine，用于翻译Engine列表切换。注意：当前使用中的engine是不能enable设置为false
- `name`：自定义引擎名称，必须唯一。
- `apiUrl`：接口地址。
- `method`：`GET` 或 `POST`。
- `headers`：请求头。
- `query`：URL 查询参数。
- `body`：请求体。
- `responsePath`：从响应 JSON 中取翻译结果的路径，支持 `choices[0].message.content` 这种数组路径写法，表示获取choices第1个元素message中的content
- `fromLanguages`：原始语言映射，key 是语言名，value 是语言 code。
- `toLanguages`：目标语言映射，key 是语言名，value 是语言 code。
- `batchStrategy`：可选字段，多段文本请求模式，支持 `none`、`join`、`array`, 默认：`none`
- `joinDelimiter`：可选字段，`batchStrategy=join` 时的拼接分隔符，默认：`undefined`
- `timeout`：请求超时时间，单位毫秒, 默认：30000

### 例子：本地用ollama跑翻译大模型作为翻译Engine
说明：本地部署翻译大模型，需要你有GPU显卡，否则翻译效果很差(翻译慢、翻译不准确)

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
      "prompt": "将 {{text}} 从 {{from}} 翻译到 {{to}}",
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

返回示例：

```json
{
  "response": "你好，世界！"
}
```
上面这种接口配置 `responsePath: "response"` 即可。

如果你搞懂了这套配置规则，那么你就可以随心所欲的配置自定义Engine。
