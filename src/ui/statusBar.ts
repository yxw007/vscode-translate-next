import * as vscode from 'vscode';
import { appName } from '../common';

export function createStatusBarItem(commandId: string, tooltip: string) {
  let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.command = commandId;

  let tips = new vscode.MarkdownString(tooltip);
  tips.isTrusted = true;
  item.tooltip = tips;

  item.show();
  return item;
}

export function registerStatusBar(context: vscode.ExtensionContext) {
  let targetBar = createStatusBarItem("extension.setTargetLanguage", `${appName}: click to set target language`);
  let defaultEngineBar = createStatusBarItem("extension.setDefaultEngine", `${appName}: click to set default engine`);

  context.subscriptions.push(targetBar);
  context.subscriptions.push(defaultEngineBar);

  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration(`${appName}.targetLanguage`) || e.affectsConfiguration(`${appName}.defaultEngine`)) {
      updateStatusBarItem();
    }
  });

  function updateStatusBarItem() {
    let targetLanguage = vscode.workspace.getConfiguration(appName).get('targetLanguage');
    targetBar.text = targetLanguage ? `${targetLanguage}` : `Select target language`;
    targetBar.show();

    let defaultEngine = vscode.workspace.getConfiguration(appName).get('defaultEngine');
    defaultEngineBar.text = defaultEngine ? `${defaultEngine}` : `Select default engine`;
    defaultEngineBar.show();
  }

  updateStatusBarItem();
}
