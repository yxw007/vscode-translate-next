import * as vscode from 'vscode';

const { translator, engines, getLanguage } = require("@yxw007/translate");
const pkg = require("../package.json");
const appName = normalName(pkg.name.split("-").slice(1).join("-"));
let originLanguages: string[] = [];
let targetLanguages: string[] = [];
let registeredEngines: string[] = [];

const getConfigValue = (config: vscode.WorkspaceConfiguration, key: string): string => (config.get(key) ?? "");

function initTranslator() {
	let google = engines.google()
	addEngine(google);
	updateLanguageConfig(google.name);
	updateDefaultTargetLanguage(targetLanguages);
}

function addEngine(engine: any) {
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
			const azureConfig = vscode.workspace.getConfiguration(`${appName}.azure`);
			addEngine(engines.azure({
				key: getConfigValue(azureConfig, "key"),
				region: getConfigValue(azureConfig, "region")
			}));
			break;
		}
		case "amazon": {
			const amazonConfig = vscode.workspace.getConfiguration(`${appName}.amazon`);
			addEngine(engines.amazon({
				region: getConfigValue(amazonConfig, "region"),
				accessKeyId: getConfigValue(amazonConfig, "key_id"),
				secretAccessKey: getConfigValue(amazonConfig, "access_key")
			}))
			break;
		}
		case "baidu": {
			const baiduConfig = vscode.workspace.getConfiguration(`${appName}.baidu`);
			addEngine(engines.baidu({
				appId: getConfigValue(baiduConfig, "app_id"),
				secretKey: getConfigValue(baiduConfig, "secret_key")
			}));
			break;
		}
		case "deepl": {
			const deeplConfig = vscode.workspace.getConfiguration(`${appName}.deepl`);
			addEngine(engines.deepl({
				key: getConfigValue(deeplConfig, "key")
			}));
			break;
		}
		case "google": {
			break;
		}
		default: {
			throw new Error(`Engine ${engineName} is not supported !`);
		}
	}
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
		const engine = vscode.workspace.getConfiguration(appName).get("defaultEngine") as string;
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

function normalName(name: string) {
	let arr = name.split("");
	arr[0] = arr[0].toLocaleUpperCase();
	return arr.join("");
}

async function choiceTargetLanguage(): Promise<string | undefined> {
	const quickPickData: RecentlyUsed[] = recentlyUsed
		.map((r) => ({
			label: r,
			description: "(recently used)",
		}));
	quickPickData.concat(targetLanguages.map(k => ({ label: k })));
	return vscode.window.showQuickPick(quickPickData).then(r => r?.label);
}

function updateTargetLanguage(selectedLanguage: string) {
	vscode.workspace
		.getConfiguration()
		.update(`${appName}.targetLanguage`, selectedLanguage, vscode.ConfigurationTarget.Global);
}

function checkAzureConfigValid() {
	const azureConfig = vscode.workspace.getConfiguration(`${appName}.azure`);
	const key = azureConfig.get("key");
	const region = azureConfig.get("region");
	if (!key || !region) {
		throw new Error('Azure config is invalid ! Please check your settings !');
	}
}

function checkAmazonConfigValid() {
	const amazonConfig = vscode.workspace.getConfiguration(`${appName}.amazon`);
	const region = amazonConfig.get("region");
	const key_id = amazonConfig.get("key_id");
	const access_key = amazonConfig.get("access_key");
	if (!region || !key_id || !access_key) {
		throw new Error('Amazon config is invalid ! Please check your settings !');
	}
}

function checkBaiduConfigValid() {
	const baiduConfig = vscode.workspace.getConfiguration(`${appName}.baidu`);
	const app_id = baiduConfig.get("app_id");
	const secret_key = baiduConfig.get("secret_key");
	if (!app_id || !secret_key) {
		throw new Error('Baidu config is invalid ! Please check your settings !');
	}
}

function checkDeeplConfigValid() {
	const deeplConfig = vscode.workspace.getConfiguration(`${appName}.deepl`);
	const key = deeplConfig.get("key");
	if (!key) {
		throw new Error('Deepl config is invalid ! Please check your settings !');
	}
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

function updateLanguageConfig(engine: string) {
	const languages = getLanguage(engine);
	originLanguages = Object.keys(languages.from);
	targetLanguages = Object.keys(languages.to);
}

function updateDefaultTargetLanguage(targetLanguages: string[]) {
	const config = vscode.workspace.getConfiguration();
	const englishIdx = targetLanguages.findIndex((key) => key.toLowerCase().indexOf("english") >= 0);
	if (englishIdx == -1) {
		throw new Error('No English language found !');
	}
	const english = targetLanguages[englishIdx]
	config.update(`${appName}.targetLanguage`, english, vscode.ConfigurationTarget.Global);
}

function updateEngine(defaultEngine: string) {
	registerEngine(defaultEngine);

	vscode.workspace
		.getConfiguration()
		.update(`${appName}.defaultEngine`, defaultEngine, vscode.ConfigurationTarget.Global);

	//update language config
	updateLanguageConfig(defaultEngine);

	//reset default target language as English
	updateDefaultTargetLanguage(targetLanguages);
}

async function handleTranslateText() {
	let selectedLanguage: string | undefined = vscode.workspace.getConfiguration(appName).get('targetLanguage');
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

	const targetLanguage = targetLanguages.find((key) => selectedLanguage.toLowerCase().indexOf(key.toLowerCase()) >= 0);
	if (!targetLanguage) {
		vscode.window.showWarningMessage('No target language found !');
		return;
	}

	const { document, selections } = editor;
	let defaultEngine: string | undefined = vscode.workspace.getConfiguration(appName).get("defaultEngine");
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

function createStatusBarItem(commandId: string, tooltip: string) {
	let item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	item.command = commandId;

	let tips = new vscode.MarkdownString(tooltip);
	tips.isTrusted = true;
	item.tooltip = tips;

	item.show();
	return item;
}

function registerStatusBar(context: vscode.ExtensionContext) {
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

export function activate(context: vscode.ExtensionContext) {
	try {
		initTranslator();
		registerCommands(context);
		registerStatusBar(context);
	} catch (error: any) {
		vscode.window.showInformationMessage(`${pkg.name} extension active failed ! error:`, error.message);
	}
}

export function deactivate() { }
