import * as vscode from 'vscode';
import type { Engines } from "@yxw007/translate";

import { hoverText, translateText, changeTargetLanguage, changeEngine, updateEngine } from "./subscriptions"
import { appName, useConfig } from './common';
import { registerStatusBar } from './ui';

const { getAppConfigValue } = useConfig();

function initTranslator() {
	let engine = getAppConfigValue("defaultEngine");
	if (!engine) {
		engine = "google";
	}
	updateEngine(engine as Engines);
}

function registerCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(translateText);
	context.subscriptions.push(changeTargetLanguage);
	context.subscriptions.push(changeEngine);
	context.subscriptions.push(hoverText);
}

function listenConfigChange(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration(`${appName}.defaultEngine`)) {
			const defaultEngine = vscode.workspace.getConfiguration(appName).get('defaultEngine');
			if (!defaultEngine) {
				vscode.window.showWarningMessage('No default engine found !');
				return;
			}
			updateEngine(defaultEngine as Engines);
		}
	});
}

export function activate(context: vscode.ExtensionContext) {
	try {
		initTranslator();
		registerCommands(context);
		registerStatusBar(context);
		listenConfigChange(context);
	} catch (error: any) {
		vscode.window.showInformationMessage(`${pkg.name} extension active failed ! error:`, error.message);
	}
}

export function deactivate() { }
