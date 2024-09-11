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
		const engine = vscode.workspace.getConfiguration('Translate-next').get("defaultEngine") ?? "google";
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

function registerCommands(context: vscode.ExtensionContext) {
	const translateText = vscode.commands.registerCommand('extension.translateText', () => {
		//TODO: 如何没有设置目标语言，提示用户设置目标语言
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active text editor found !');
			return;
		}
		//TODO: 从配置中获取目标语言
		//TODO: 获取当前选中的翻译引擎
		const selectedLanguage: string = vscode.workspace.getConfiguration('translate-next').get('targetLanguage') ?? "english";
		const targetLanguage = Object.keys(languageNames).find((key) => selectedLanguage.toLowerCase().indexOf(key) >= 0) ?? "english";
		const { document, selections } = editor;

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

	});
	context.subscriptions.push(translateText);

	const setTargetLanguage = vscode.commands.registerCommand('extension.setTargetLanguage', () => {
		//TODO: 弹出一个选中列表，让用户选择目标语言
	});
	context.subscriptions.push(setTargetLanguage);
}

export function activate(context: vscode.ExtensionContext) {
	try {
		initTranslator();
		registerCommands(context);
	} catch (error: any) {
		vscode.window.showInformationMessage(`${pkg.name} extension active failed ! error:`, error);
	}
}

export function deactivate() { }
