import * as vscode from "vscode";
import pkg from "../../package.json";

export const appName = normalName(pkg.name.split("-").slice(1).join("-"));
export let originLanguages: string[] = [];
export let targetLanguages: string[] = [];
export let registeredEngines: string[] = [];

export const getConfigValue = (config: vscode.WorkspaceConfiguration, key: string): string => (config.get(key) ?? "");

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
