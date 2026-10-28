# Configure the Tencent Translation Engine

## Step 1: Register a Tencent Cloud account
Website: [https://console.cloud.tencent.com/](https://console.cloud.tencent.com/)

## Step 2: Activate machine translation
![](../../assets/config-engine/tencent/1.jpg)
![](../../assets/config-engine/tencent/2.jpg)

## Step 3: Create an API key
Shortcut: [https://console.cloud.tencent.com/cam/capi?__qcai_handover=nGANo4jE](https://console.cloud.tencent.com/cam/capi?__qcai_handover=nGANo4jE)

![](../../assets/config-engine/tencent/5.jpg)
![](../../assets/config-engine/tencent/6.jpg)

Copy the `secretId` / `secretKey` (and the region if needed) into `Translate-next.tencent.secretId`, `Translate-next.tencent.secretKey` and `Translate-next.tencent.region`.

That's all — the Tencent engine is ready to use.
