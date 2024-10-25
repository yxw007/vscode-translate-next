import * as vscode from "vscode";
import pkg from "../../package.json";

export const appName = normalName(pkg.name.split("-").slice(1).join("-"));
export let originLanguages: string[] = [];
export let targetLanguages: string[] = [];
export let registeredEngines: string[] = [];

export const getConfigValue = (config: vscode.WorkspaceConfiguration, key: string): string => (config.get(key) ?? "");

export function useConfig() {
  const globalConfig = vscode.workspace.getConfiguration();
  const appConfig = vscode.workspace.getConfiguration(appName)
  return {
    getRegionConfig: (region: string) => {
      return vscode.workspace.getConfiguration(`${appName}.${region}`);
    },
    getAppConfigValue: getConfigValue.bind(null, appConfig),
    updateGlobalConfig: (key: string, value: any) => {
      globalConfig.update(`${appName}.${key}`, value, vscode.ConfigurationTarget.Global);
    }
  }
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
