import * as vscode from 'vscode';

const { translator, engines } = require("@yxw007/translate");
const pkg = require("../package.json");

function initTranslator() {
	translator.use(engines.google());
	translator.use(engines.baidu({
		appId: "",
		secretKey: ""
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
 * @param {string} selectedLanguage The current language
 * @returns {Array.<Promise<TranslateRes>>}
 */
function getTranslationsPromiseArray(editor: vscode.TextEditor, selections: Array<vscode.Selection>, document: vscode.TextDocument, selectedLanguage: string) {
	return selections.map((selection: vscode.Selection) => {
		const selectedText = getSelectedText(document, selection);
		return getTranslationPromise(editor, selectedText, selectedLanguage, selection);
	});
}

/**
 * Translates the selectedText to the selectedLanguage like a Promise
 *
 * @param {string} selectedText Text
 * @param {string} selectedLanguage Language
 * @param {vscode.Selection} selection Selection
 * @returns {Promise.<TranslateRes>}
 */
function getTranslationPromise(editor: vscode.TextEditor, selectedText: string, selectedLanguage: string, selection: vscode.Selection): Promise<TranslateRes> {
	return new Promise((resolve, reject) => {
		let decoration = vscode.window.createTextEditorDecorationType({
			color: '#FF2D00',
			backgroundColor: "transparent"
		});
		editor.setDecorations(decoration, [selection]);

		translator.translate(selectedText, { to: selectedLanguage })
			.then((res: any) => {
				resolve({ selection, translation: res.text });
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
		const selectedLanguage: string = vscode.workspace.getConfiguration('translate').get('targetLanguage') ?? "english";
		const { document, selections } = editor;

		const translationsPromiseArray = getTranslationsPromiseArray(
			editor,
			Array.from(selections),
			document,
			selectedLanguage
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
