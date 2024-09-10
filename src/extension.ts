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
function getTranslationsPromiseArray(selections: Array<vscode.Selection>, document: vscode.TextDocument, selectedLanguage: string) {
	return selections.map((selection: vscode.Selection) => {
		const selectedText = getSelectedText(document, selection);
		return getTranslationPromise(selectedText, selectedLanguage, selection);
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
function getTranslationPromise(selectedText: string, selectedLanguage: string, selection) {

}

function registerCommands(context: vscode.ExtensionContext) {
	const translateText = vscode.commands.registerCommand('extension.translateText', () => {
		//TODO: 如何没有设置目标语言，提示用户设置目标语言
		const editor = vscode.window.activeTextEditor;
		const { document, selections } = editor;
		selections.map((selection) => {
			const selectedText = getSelectedText(document, selection);
			return getTranslationPromise(selectedText, selectedLanguage, selection);
		});

	});
	context.subscriptions.push(translateText);

	const setTargetLanguage = vscode.commands.registerCommand('extension.setTargetLanguage', () => {

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
