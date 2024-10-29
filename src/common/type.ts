import { Range } from "vscode";
import { IToken, StackElement } from "../syntax";

export interface IScopeLen {
	scopes: string[];
	len: number;
}

export interface ICommentToken {
	ignoreStart?: number;
	ignoreEnd?: number;
	text: string;
	scope?: IScopeLen[];
}

export interface ICommentBlock {
	range: Range;
	comment: string;
	tokens?: ICommentToken[];
}

export interface ITranslatedText {
	translatedText: string;
	humanizeText?: string;
	targets: string[];
	texts: string[];
	combined: boolean[];
}

export interface IGrammarExtensions {
	value: ITMSyntaxExtensionPoint[];
	extensionLocation: string;
	languages: ITMLanguageExtensionPoint[];
}

export interface ITMSyntaxExtensionPoint {
	language: string;
	scopeName: string;
	path: string;
	embeddedLanguages: IEmbeddedLanguagesMap;
	tokenTypes: TokenTypesContribution;
	injectTo: string[];
}

export interface ITMLanguageExtensionPoint {
	id: number;
	name: string;
}

export interface IEmbeddedLanguagesMap {
	[scopeName: string]: string;
}

export interface TokenTypesContribution {
	[scopeName: string]: string;
}

export type checkScopeFunction = (scopes: string[]) => boolean;


export interface ITokenState {
	startState: StackElement | null;
	tokens1: IToken[];
	endState: StackElement | null;
}
