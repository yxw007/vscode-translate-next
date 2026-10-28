# Configure the Baidu Translation Engine

## Step 1: Register a Baidu Translate platform account
Website: [https://fanyi-api.baidu.com/](https://fanyi-api.baidu.com/)

## Step 2: Register as a Baidu developer
1. Open the management console
	![](../../assets/config-engine/baidu/2.jpg)
2. Register as a Baidu developer
	![](../../assets/config-engine/baidu/3.jpg)

## Step 3: Activate domain text translation
- Make sure the "domain text translation" service is activated on your account; activate it yourself if it is not
	![](../../assets/config-engine/baidu/4.jpg)

## Step 4: Open the VS Code settings
1. Open the settings page
	![](../../assets/config-engine/baidu/6.jpg)
2. Configure Baidu: `Translate-next.baidu.appId` and `Translate-next.baidu.secretKey`
	![](../../assets/config-engine/baidu/7.jpg)

## Step 5: Switch the translation engine to `baidu`
![](../../assets/config-engine/baidu/8.jpg)

That's all — the Baidu engine is ready to use.

## Common Baidu translation errors

 | Error code | Meaning              | Solution                                                                   |
 | ---------- | -------------------- | -------------------------------------------------------------------------- |
 | 52003      | Unauthorized user    | Check that the appId is correct and that the service is activated          |
 | 54003      | Access restricted    | The activated service may be general text translation; switch to domain text translation |
	
> For more error codes, see the [error code list](https://api.fanyi.baidu.com/doc/22)
