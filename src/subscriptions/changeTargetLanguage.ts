import * as vscode from 'vscode';
import { appName, normalName, recentlyUsed, RecentlyUsed, targetLanguages } from '../common';

export async function choiceTargetLanguage(): Promise<string | undefined> {
  const quickPickData: RecentlyUsed[] = recentlyUsed
    .map((r) => ({
      label: r,
      description: "(recently used)",
    }));
  quickPickData.concat(targetLanguages.map(k => ({ label: k })));
  return vscode.window.showQuickPick(quickPickData).then(r => r?.label);
}

async function handleSetTargetLanguage() {
  const quickPickData: RecentlyUsed[] = recentlyUsed
    .map((r) => ({
      label: r,
      description: "(recently used)",
    }));
  quickPickData.push(...targetLanguages.map(k => ({ label: k })));

  const selectedLanguage = await vscode.window.showQuickPick(quickPickData);
  if (!selectedLanguage) {
    return;
  }

  updateLanguageList(selectedLanguage.label);

  vscode.workspace
    .getConfiguration()
    .update(`${appName}.targetLanguage`, normalName(selectedLanguage.label), vscode.ConfigurationTarget.Global);
  return selectedLanguage.label;
}

function updateLanguageList(selectedLanguage: string) {
  const index = recentlyUsed.findIndex((r) => r === selectedLanguage);
  if (index !== -1) {
    // Remove the recently used language from the list
    recentlyUsed.splice(index, 1);
  }
  // Add the language in recently used languages
  recentlyUsed.splice(0, 0, selectedLanguage);
}

export const changeTargetLanguage = vscode.commands.registerCommand('extension.setTargetLanguage', handleSetTargetLanguage);
