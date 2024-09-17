import * as vscode from 'vscode';

const { translator, engines, languageNames } = require("@yxw007/translate");
const pkg = require("../package.json");

function initTranslator() {
	const azureConfig = vscode.workspace.getConfiguration('Translate-next.azure');
	const amazonConfig = vscode.workspace.getConfiguration('Translate-next.amazon');
	const baiduConfig = vscode.workspace.getConfiguration('Translate-next.baidu');

	const get = (config: vscode.WorkspaceConfiguration, key: string): string => (config.get(key) ?? "");

	translator.use(engines.google());
	translator.use(engines.azure({
		key: get(azureConfig, "key"),
		region: get(azureConfig, "region")
	}));
	translator.use(engines.amazon({
		region: get(amazonConfig, "region"),
		key_id: get(amazonConfig, "key_id"),
		access_key: get(amazonConfig, "access_key")
	}));
	translator.use(engines.baidu({
		appId: get(baiduConfig, "app_id"),
		secretKey: get(baiduConfig, "secret_key")
	}));
}

type TranslateRes = {
	selection: vscode.Selection;
	translation: string
}

interface RecentlyUsed {
	label: string;
	description?: string;
}

/**
 * The list of recently used languages
 */
const recentlyUsed: string[] = [];

/**
 * Extracts a text from the active document selection
 *
 * @param {vscode.TextDocument} document The current document
 * @param {vscode.Selection} selection The current selection
 * @returns {string} A text
 */
function getSelectedText(document: vscode.TextDocument, selection: vscode.Selection) {
	const charRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
	return document.getText(charRange);
}

/**
 * Generates the array of promises based on selections
 *
 * @param {Array.<vscode.Selection>} selections Array of selections
 * @param {vscode.TextDocument} document The current document
 * @param {string} targetLanguage The current language
 * @returns {Array.<Promise<TranslateRes>>}
 */
function getTranslationsPromiseArray(editor: vscode.TextEditor, selections: Array<vscode.Selection>, document: vscode.TextDocument, targetLanguage: string) {
	return selections.map((selection: vscode.Selection) => {
		const selectedText = getSelectedText(document, selection);
		return getTranslationPromise(editor, selectedText, targetLanguage, selection);
	});
}

/**
 * Translates the selectedText to the selectedLanguage like a Promise
 *
 * @param {string} selectedText Text
 * @param {string} targetLanguage Language
 * @param {vscode.Selection} selection Selection
 * @returns {Promise.<TranslateRes>}
 */
function getTranslationPromise(editor: vscode.TextEditor, selectedText: string, targetLanguage: string, selection: vscode.Selection): Promise<TranslateRes> {
	return new Promise((resolve, reject) => {
		let decoration = vscode.window.createTextEditorDecorationType({
			color: '#FF2D00',
			backgroundColor: "transparent"
		});
		editor.setDecorations(decoration, [selection]);
		const engine = vscode.workspace.getConfiguration('Translate-next').get("defaultEngine") as string;
		translator.translate(selectedText, { to: targetLanguage, engine })
			.then((res: string[]) => {
				resolve({ selection, translation: res[0] });
				decoration.dispose();
			})
			.catch((e: any) => {
				reject(e);
				decoration.dispose();
			});
	});
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

async function handleSetTargetLanguage() {
	const quickPickData: RecentlyUsed[] = recentlyUsed
		.map((r) => ({
			label: r,
			description: "(recently used)",
		}));
	quickPickData.push(...Object.keys(languageNames).map(k => ({ label: k })));

	const selectedLanguage = await vscode.window.showQuickPick(quickPickData);
	if (!selectedLanguage) {
		return;
	}

	updateLanguageList(selectedLanguage.label);

	vscode.workspace
		.getConfiguration()
		.update("Translate-next.targetLanguage", normalLanguage(selectedLanguage.label), vscode.ConfigurationTarget.Global);
	return selectedLanguage.label;
}

function normalLanguage(language: string) {
	let arr = language.split("");
	arr[0] = arr[0].toLocaleUpperCase();
	return arr.join("");
}

async function choiceTargetLanguage(): Promise<string | undefined> {
	const quickPickData: RecentlyUsed[] = recentlyUsed
		.map((r) => ({
			label: r,
			description: "(recently used)",
		}));
	quickPickData.concat(Object.keys(languageNames).map(k => ({ label: k })));
	return vscode.window.showQuickPick(quickPickData).then(r => r?.label);
}

function updateTargetLanguage(selectedLanguage: string) {
	vscode.workspace
		.getConfiguration()
		.update("Translate-next.targetLanguage", selectedLanguage, vscode.ConfigurationTarget.Global);
}

function checkAzureConfigValid() {
	const azureConfig = vscode.workspace.getConfiguration('Translate-next.azure');
	const key = azureConfig.get("key");
	const region = azureConfig.get("region");
	if (!key || !region) {
		throw new Error('Azure config is invalid ! Please check your settings !');
	}
}

function checkAmazonConfigValid() {
	const amazonConfig = vscode.workspace.getConfiguration('Translate-next.amazon');
	const region = amazonConfig.get("region");
	const key_id = amazonConfig.get("key_id");
	const access_key = amazonConfig.get("access_key");
	if (!region || !key_id || !access_key) {
		throw new Error('Amazon config is invalid ! Please check your settings !');
	}
}

function checkBaiduConfigValid() {
	const baiduConfig = vscode.workspace.getConfiguration('Translate-next.baidu');
	const app_id = baiduConfig.get("app_id");
	const secret_key = baiduConfig.get("secret_key");
	if (!app_id || !secret_key) {
		throw new Error('Baidu config is invalid ! Please check your settings !');
	}
}

async function choiceEngine(): Promise<string | undefined> {
	const quickPickData = [
		"google",
		"azure",
		"amazon",
		"baidu"
	];

	let engine = await vscode.window.showQuickPick(quickPickData);
	if (!engine) {
		vscode.window.showWarningMessage('choice engine is invalid !');
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
		default:
			break;
	}

	return engine;
}

function updateEngine(defaultEngine: string) {
	vscode.workspace
		.getConfiguration()
		.update("Translate-next.defaultEngine", defaultEngine, vscode.ConfigurationTarget.Global);
}

async function handleTranslateText() {
	let selectedLanguage: string | undefined = vscode.workspace.getConfiguration('Translate-next').get('targetLanguage');
	if (!selectedLanguage) {
		selectedLanguage = await choiceTargetLanguage();
		if (!selectedLanguage) {
			vscode.window.showWarningMessage('No target language found !');
			return;
		}
	}
	updateTargetLanguage(selectedLanguage);

	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showWarningMessage('No active text editor found !');
		return;
	}

	const targetLanguage = Object.keys(languageNames).find((key) => selectedLanguage.toLowerCase().indexOf(key) >= 0) ?? "english";
	const { document, selections } = editor;

	let defaultEngine: string | undefined = vscode.workspace.getConfiguration('Translate-next').get("defaultEngine");
	if (!defaultEngine) {
		const success = handleSetDefaultEngine();
		if (!success) {
			return;
		}
	}

	const translationsPromiseArray = getTranslationsPromiseArray(
		editor,
		Array.from(selections),
		document,
		targetLanguage
	);

	Promise.all(translationsPromiseArray)
		.then(function (results) {
			editor.edit((builder) => {
				results.forEach((r) => {
					if (!!r.translation) {
						builder.replace(r.selection, r.translation);
					}
				});
			});
		})
		.catch((e) => vscode.window.showErrorMessage(e.message));
}

async function handleSetDefaultEngine() {
	let engine = null;
	try {
		engine = await choiceEngine();
	} catch (error: any) {
		vscode.window.showWarningMessage(error?.message);
		return;
	}

	if (!engine) {
		vscode.window.showWarningMessage('No engine found !');
		return;
	}

	updateEngine(engine);

	return true;
}

function registerCommands(context: vscode.ExtensionContext) {
	const translateText = vscode.commands.registerCommand('extension.translateText', handleTranslateText);
	context.subscriptions.push(translateText);

	const setTargetLanguage = vscode.commands.registerCommand('extension.setTargetLanguage', handleSetTargetLanguage);
	context.subscriptions.push(setTargetLanguage);

	const setDefaultEngine = vscode.commands.registerCommand('extension.setDefaultEngine', handleSetDefaultEngine);
	context.subscriptions.push(setDefaultEngine);
}

export function activate(context: vscode.ExtensionContext) {
	try {
		initTranslator();
		registerCommands(context);
	} catch (error: any) {
		vscode.window.showInformationMessage(`${pkg.name} extension active failed ! error:`, error.message);
	}
}

export function deactivate() { }
