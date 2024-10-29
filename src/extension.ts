import * as vscode from 'vscode';
import type { Engines } from "@yxw007/translate";

import { hoverText, translateText, changeTargetLanguage, changeEngine, updateEngine, addSelection, outputPanel } from "./subscriptions";
import { appName, canLanguages, getCanLanguageIds, logger, pkg, useConfig } from './common';
import { registerStatusBar } from './ui';
import { createComment } from './syntax';

export let ctx: vscode.ExtensionContext;
const { getAppConfigValue } = useConfig();

async function initTranslator() {
	let engine = getAppConfigValue("defaultEngine");
	if (!engine) {
		engine = "google";
	}
	updateEngine(engine as Engines);
	canLanguages.length = 0;
	canLanguages.push(...(await getCanLanguageIds()));
	logger.log("canLanguages", canLanguages);
}

function registerCommands(context: vscode.ExtensionContext) {
	context.subscriptions.push(translateText);
	context.subscriptions.push(changeTargetLanguage);
	context.subscriptions.push(changeEngine);
	context.subscriptions.push(hoverText);
	context.subscriptions.push(addSelection);
	context.subscriptions.push(outputPanel);
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

export async function activate(context: vscode.ExtensionContext) {
	try {
		ctx = context;
		await initTranslator();
		await createComment();
		registerCommands(context);
		registerStatusBar(context);
		listenConfigChange(context);
	} catch (error: any) {
		vscode.window.showInformationMessage(`${pkg.name} extension active failed ! error:`, error.message);
	}
}

export function deactivate() { }
