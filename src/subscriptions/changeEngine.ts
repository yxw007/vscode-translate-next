import * as vscode from 'vscode';
import { Engine, engines, Engines, getLanguage, translator } from '@yxw007/translate';
import { appName, originLanguages, recentlyUsed, registeredEngines, targetLanguages, useConfig } from '../common';

const { getRegionConfig, updateGlobalConfig } = useConfig();

export function updateTargetLanguage(selectedLanguage: string) {
  vscode.workspace
    .getConfiguration()
    .update(`${appName}.targetLanguage`, selectedLanguage, vscode.ConfigurationTarget.Global);
}

export async function handleSetDefaultEngine() {
  let engine = null;
  try {
    engine = await choiceEngine();
  } catch (error: any) {
    vscode.window.showWarningMessage(error?.message);
    return;
  }

  if (!engine) {
    return;
  }

  updateEngine(engine as Engines);

  return true;
}

async function choiceEngine(): Promise<string | undefined> {
  const quickPickData = [
    "google",
    "azure",
    "amazon",
    "baidu",
    "deepl"
  ];

  let engine = await vscode.window.showQuickPick(quickPickData);
  if (!engine) {
    return;
  }

  switch (engine) {
    case "azure":
      checkAzureConfigValid();
      break;
    case "amazon":
      checkAmazonConfigValid();
      break;
    case "baidu":
      checkBaiduConfigValid();
      break;
    case "deepl":
      checkDeeplConfigValid();
      break;
    default:
      break;
  }

  return engine;
}

function checkAzureConfigValid() {
  const azureConfig = getRegionConfig("azure");
  const key = azureConfig.get("key");
  const region = azureConfig.get("region");
  if (!key || !region) {
    throw new Error('Azure config is invalid ! Please check your settings !');
  }
}

function checkAmazonConfigValid() {
  const amazonConfig = getRegionConfig("amazon");
  const region = amazonConfig.get("region");
  const key_id = amazonConfig.get("key_id");
  const access_key = amazonConfig.get("access_key");
  if (!region || !key_id || !access_key) {
    throw new Error('Amazon config is invalid ! Please check your settings !');
  }
}

function checkBaiduConfigValid() {
  const baiduConfig = getRegionConfig("baidu");
  const app_id = baiduConfig.get("app_id");
  const secret_key = baiduConfig.get("secret_key");
  if (!app_id || !secret_key) {
    throw new Error('Baidu config is invalid ! Please check your settings !');
  }
}

function checkDeeplConfigValid() {
  const deeplConfig = getRegionConfig("deepl");
  const key = deeplConfig.get("key");
  if (!key) {
    throw new Error('Deepl config is invalid ! Please check your settings !');
  }
}

function addEngine(engine: Engine) {
  if (registeredEngines.includes(engine.name)) {
    return;
  }

  translator.use(engine);
  registeredEngines.push(engine.name as string);
}

function registerEngine(engineName: string) {
  if (registeredEngines.includes(engineName)) {
    return;
  }

  switch (engineName) {
    case "azure": {
      const azureConfig = getRegionConfig("azure");
      addEngine(engines.azure({
        key: azureConfig.get("key")!,
        region: azureConfig.get("region")!
      }));
      break;
    }
    case "amazon": {
      const amazonConfig = getRegionConfig("amazon");
      addEngine(engines.amazon({
        region: amazonConfig.get("region")!,
        accessKeyId: amazonConfig.get("key_id")!,
        secretAccessKey: amazonConfig.get("access_key")!
      }));
      break;
    }
    case "baidu": {
      const baiduConfig = getRegionConfig("baidu");
      addEngine(engines.baidu({
        appId: baiduConfig.get("app_id")!,
        secretKey: baiduConfig.get("secret_key")!
      }));
      break;
    }
    case "deepl": {
      const deeplConfig = getRegionConfig("deepl");
      addEngine(engines.deepl({
        key: deeplConfig.get("key")!
      }));
      break;
    }
    case "google": {
      addEngine(engines.google());
      break;
    }
    default: {
      throw new Error(`Engine ${engineName} is not supported !`);
    }
  }
}

export function updateEngine(defaultEngine: Engines) {
  registerEngine(defaultEngine);

  updateGlobalConfig("defaultEngine", defaultEngine);

  //clear recentlyUsed
  recentlyUsed.length = 0;

  //update language config
  updateLanguageConfig(defaultEngine);

  //reset default target language as English
  updateDefaultTargetLanguage(targetLanguages);
}


function updateLanguageConfig(engine: Engines) {
  const languages = getLanguage(engine);
  originLanguages.length = 0;
  targetLanguages.length = 0;
  originLanguages.push(...Object.keys(languages.from));
  targetLanguages.push(...Object.keys(languages.to));
}

function updateDefaultTargetLanguage(targetLanguages: string[]) {
  const config = vscode.workspace.getConfiguration();
  const englishIdx = targetLanguages.findIndex((key) => key.toLowerCase().indexOf("english") >= 0);
  if (englishIdx === -1) {
    throw new Error('No English language found !');
  }
  const english = targetLanguages[englishIdx];
  config.update(`${appName}.targetLanguage`, english, vscode.ConfigurationTarget.Global);
}


export const changeEngine = vscode.commands.registerCommand('extension.setDefaultEngine', handleSetDefaultEngine);
