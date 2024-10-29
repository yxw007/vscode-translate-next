import { commands } from 'vscode';
import * as vscode from 'vscode';
import { translator } from "@yxw007/translate";
import type { Engines, ToLanguage } from "@yxw007/translate";

import { appName, targetLanguages, TranslateRes } from "../common";
import { choiceTargetLanguage } from "./changeTargetLanguage";
import { updateTargetLanguage, handleSetDefaultEngine } from "./changeEngine";

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
    const engine = vscode.workspace.getConfiguration(appName).get("defaultEngine") as Engines;
    translator.translate(selectedText, { to: targetLanguage as ToLanguage<typeof engine>, engine })
      .then((res) => {
        const result = res as string[];
        resolve({ selection, translation: result[0] as string });
        decoration.dispose();
      })
      .catch((e: any) => {
        reject(e);
        decoration.dispose();
      });
  });
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
        results.forEach((r: any) => {
          if (!!r.translation) {
            builder.replace(r.selection, r.translation);
          }
        });
      });
    })
    .catch((e) => vscode.window.showErrorMessage(e.message));
}


export const translateText = commands.registerCommand('extension.translateText', handleTranslateText);
