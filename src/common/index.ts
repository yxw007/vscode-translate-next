import * as vscode from "vscode";
import pkg from "../../package.json";
import humanizeString from 'humanize-string';
import { ctx } from "../extension";

export * from "./type";
export * from "./ext";
export * from "./string";
export { pkg };
export const appName = normalName(pkg.name.split("-").slice(1).join("-"));
export let originLanguages: string[] = [];
export let targetLanguages: string[] = [];
export let registeredEngines: string[] = [];
const appNameTag = `${appName}:`;
export let canLanguages: string[] = [];
export let outputChannel = vscode.window.createOutputChannel(appName);

const { getAppConfigValue } = useConfig();

export function getParentLanguage() {
  return getAppConfigValue("parent_language");
}

export function getDefaultEngine() {
  return getAppConfigValue("defaultEngine");
}

export function getConfigValue<T>(config: vscode.WorkspaceConfiguration, key: string): T | undefined;
export function getConfigValue<T>(config: vscode.WorkspaceConfiguration, key: string, defaultValue?: T): T | undefined {
  let value = config.get<T>(key);
  if (typeof value === 'undefined' || value === '') {
    value = defaultValue;
  }
  return value;
};


export const logger = {
  log(...args: any) {
    if (vscode.ExtensionMode.Production === ctx.extensionMode) {
      outputChannel.appendLine(`${appNameTag} ${args.join(" ")}`);
    } else {
      console.log(appNameTag, ...args);
    }
  },
  warn(...args: any) {
    if (vscode.ExtensionMode.Production === ctx.extensionMode) {
      outputChannel.appendLine(`${appNameTag} ${args.join(" ")}`);
    } else {
      console.warn(appNameTag, ...args);
    }
  },
  error(...args: any) {
    if (vscode.ExtensionMode.Production === ctx.extensionMode) {
      outputChannel.appendLine(`${appNameTag} ${args.join(" ")}`);
    } else {
      console.error(appNameTag, ...args);
    }
  }
};

export const tipManager = {
  error(message: string, ...items: string[]) {
    vscode.window.showErrorMessage(appNameTag, message, ...items);
  },
  warning(message: string, ...items: string[]) {
    vscode.window.showWarningMessage(appNameTag, message, ...items);
  },
  info(message: string, ...items: string[]) {
    vscode.window.showInformationMessage(appNameTag, message, ...items);
  },
};

export function useConfig() {
  const globalConfig = vscode.workspace.getConfiguration();
  const appConfig = vscode.workspace.getConfiguration(appName);
  return {
    getRegionConfig: (region: string) => {
      return vscode.workspace.getConfiguration(`${appName}.${region}`);
    },
    getAppConfigValue: <T>(key: string) => {
      return getConfigValue<T>(appConfig, key);
    },
    updateGlobalConfig: (key: string, value: any) => {
      globalConfig.update(`${appName}.${key}`, value, vscode.ConfigurationTarget.Global);
    }
  };
}

export function normalName(name: string) {
  let arr = name.split("");
  arr[0] = arr[0].toLocaleUpperCase();
  return arr.join("");
}

export type TranslateRes = {
  selection: vscode.Selection;
  translation: string
}

export interface RecentlyUsed {
  label: string;
  description?: string;
}

/**
 * The list of recently used languages
 */
export const recentlyUsed: string[] = [];

export function humanize(originText: string) {
  const needHumanize = originText.trim().indexOf(' ') < 0;
  if (needHumanize) {
    // Converted to natural language
    return humanizeString(originText);
  }
  return '';
}
