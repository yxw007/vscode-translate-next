import { commands, Range, Selection, window } from "vscode";
import { appName } from "../common";

async function showSelection({ range }: { range: Range }) {
	let editor = window.activeTextEditor;
	if (editor) {
		const { start, end } = range;
		editor.selections = [new Selection(start.line, start.character, end.line, end.character), ...editor.selections];
		window.showTextDocument(editor.document); 
	}
}

export const addSelection = commands.registerCommand(`${appName}.addSelection`, showSelection);
