import { commands, extensions } from "vscode";
import { IGrammarExtensions, ITMLanguageExtensionPoint } from "./type";
import { appName } from ".";

/**
 * Languages capable of parsing comments via TextMate
 */
export async function getCanLanguageIds() {
	let grammarExtensions = await getGrammarExtensions();

	let canLanguages: string[] = [];
	canLanguages = grammarExtensions.reduce<string[]>(((prev, item) => {
		let lang: string[] = item.value.map((grammar) => grammar.language).filter(Boolean);
		return prev.concat(lang);
	}), []);


	let BlackLanguage: string[] = ['log', 'Log', 'code-runner-output', 'markdown'];
	canLanguages = canLanguages.filter((v) => BlackLanguage.indexOf(v) < 0);

	commands.executeCommand('setContext', `${appName}.canLanguages`, canLanguages);
	return canLanguages;
}

export async function getGrammarExtensions() {
	let { grammarExtensions } = extractGrammarExtensions([...extensions.all], 2);
	return grammarExtensions;
}

export function extractGrammarExtensions(inner: { packageJSON: any; extensionPath: string; }[], languageId: number): { grammarExtensions: IGrammarExtensions[]; languageId: number } {
	let grammarExtensions: IGrammarExtensions[] = inner.filter(({ packageJSON }) => {
		return packageJSON.contributes && packageJSON.contributes.grammars;
	}).map(({ packageJSON, extensionPath }) => {
		const contributesLanguages = packageJSON.contributes.languages || [];
		const languages: ITMLanguageExtensionPoint[] = contributesLanguages.map((item: any) => {
			return {
				id: languageId++,
				name: item.id
			};
		});
		return {
			languages,
			value: packageJSON.contributes.grammars,
			extensionLocation: extensionPath
		};
	});

	return { grammarExtensions, languageId };
}
