import { HoverProvider, languages, Hover, TextDocument, Position, CancellationToken, MarkdownString, window, Range } from 'vscode';
import { appName, canLanguages, getConfigValue, hasEndMark, humanize, ICommentBlock, isLowerCase, isUpperCase, ITranslatedText, logger, tipManager, useConfig } from '../common';
import { Engines, ToLanguage, translator } from "@yxw007/translate";
import { marked } from "marked";
import { createComment, getMarkdownTextValue } from '../syntax';

marked.setOptions({
  mangle: false,
  headerIds: false
});

const { getAppConfigValue } = useConfig();
const working = new Set<string>();
const last: Map<string, Range> = new Map();

const hoverHandler: HoverProvider = {
  async provideHover(document, position, token) {
    const hoverEnable = Boolean(getAppConfigValue("hover.enable"));
    if (!hoverEnable) {
      return;
    }
    const hoverId = getHoverId(document, position);
    if (working.has(hoverId)) {
      return new Hover('Loading...');
    }

    let hovers = await Promise.all([
      getCommentHover(document, position, token)
    ]);
    return mergeContentToFirstHover(...hovers);
  }
};

async function getCommentHover(document: TextDocument, position: Position, token: CancellationToken): Promise<Hover | null> {
  const uri = document.uri.toString();
  let block: ICommentBlock | null = selectionContains(uri, position);
  let res: { md: MarkdownString, header: MarkdownString } | undefined;
  let range: Range | undefined;

  if (!block) {
    if (document.languageId === "markdown") {
      //TODO: 翻译有点问题
      if (document.languageId !== "markdown") {return null;}
      let { translatedText, range: MarkdownRange } = await compileMarkdown(document, position);
      res = createHoverMarkdownString(
        translatedText,
        '',
        MarkdownRange,
        document,
      );
      range = MarkdownRange;
    } else if (canLanguages.includes(document.languageId)) {
      try {
        let comment = await createComment();
        block = await comment.getComment(document, position);
      } catch (e: any) {
        logger.error(e.message);
      }

      if (!block) {
        return null;
      }
    }
  }

  if (block) {
    const { translatedText, humanizeText } = await compileBlock(block, document.languageId);
    range = block.range;
    res = createHoverMarkdownString(
      translatedText,
      humanizeText,
      range,
      document,
    );
  }

  if (!res) {return null;}
  if (!range) {return null;}

  const hover = new Hover([res.header, res.md], range);
  last.set(uri, range);
  return hover;
}

//-------------------------------------------------------------------------
// hover: selection translate
//-------------------------------------------------------------------------
function selectionContains(
  url: string,
  position: Position
): ICommentBlock | null {
  let editor = window.activeTextEditor;
  //Processing requests when there is an active editor and the open document matches the requested document
  if (editor && editor.document.uri.toString() === url) {
    let selection = editor?.selections.find((selection) => {
      return !selection.isEmpty && selection.contains(position);
    });

    if (selection) {
      return {
        range: selection,
        comment: editor?.document.getText(selection) ?? "",
      };
    }
  }

  return null;
}

async function compileBlock(block: ICommentBlock, languageId?: string): Promise<ITranslatedText> {
  let translatedText: string;
  let targets: string[] = [];
  let texts: string[] = [];
  let combined: boolean[] = []; // Marked as merged rows for easy regrouping after translation
  let humanizeText: string = '';
  const { comment: originText } = block;
  let { tokens } = block;

  if (!tokens) {
    // No tokens means select translation or single word translation, only need to produce simple results
    humanizeText = humanize(originText);
    translatedText = await autoMutualTranslate(humanizeText || originText);
  } else {
    // Get the string to be translated.
    texts = tokens.map(({ text, ignoreStart = 0, ignoreEnd = 0 }) => {
      return text.slice(ignoreStart, text.length - ignoreEnd).trim();
    });

    // When multiline merge is enabled, multiple lines in a valid string are merged into the same line.
    if (getAppConfigValue<boolean>('multiLineMerge')) {
      let res = combineLine(texts);
      combined = res.combined;
      texts = res.combinedTexts;
    }

    // Filter blank lines to solve the problem of partial translation source, multi-line blank compression.
    let validTexts = texts.filter(text => {
      return text.length > 0;
    });
    let validText = validTexts.join('\n');
    let validTextLen = validText.length;

    // When there is no string to translate, the empty string is displayed directly, skipping the translation process.
    if (validTextLen === 0) {
      translatedText = originText;
    } else {
      // 只有1行，并且符合大小切换
      if (tokens.length === 1) {
        humanizeText = humanize(validText);
      }
      translatedText = await autoMutualTranslate(humanizeText || validText);

      // Reassemble the translation results to restore the filtered matches when translated, such as：/* //, etc.
      targets = translatedText.split('\n');
      if (translatedText && validTexts.length === targets.length) {
        let translated = [];
        for (let i = 0, j = 0; i < tokens.length; i++) {
          const { text, ignoreStart = 0, ignoreEnd = 0 } = tokens[i];
          const translateText = texts[i];
          let targetText = '';
          if (translateText.length > 0) {
            targetText = targets[j];
            j += 1;
          }
          // Merged rows skipped
          if (targetText === '' && combined[i]) {
            continue;
          }
          const startText = text.slice(0, ignoreStart);
          const endText = text.slice(text.length - ignoreEnd);
          translated.push(startText + targetText + endText);
        }
        translatedText = translated.join('\n');
      }
    }
  }

  return {
    translatedText,
    humanizeText,
    targets,
    texts,
    combined,
  };
}

function combineLine(texts: string[]) {
  let combined: boolean[] = []; // 标记被合并行。 便于翻译后重新组合
  let combinedTexts = texts.reduce<string[]>((prev, curr, index) => {
    let lastIndex = combined.lastIndexOf(false);
    combined[index] = false;
    if (prev.length > 0) {
      let last = prev[lastIndex];
      if (isUpperCase(last) && hasEndMark(last) && isLowerCase(curr)) {
        // If it can be merged, merge to the previous row
        prev[lastIndex] = last + ' ' + curr;
        //The current line is blank, but the blank placeholder remains
        curr = '';
        combined[index] = true;
      }
    }
    prev.push(curr);
    return prev;
  }, []);

  return { combined, combinedTexts };
}


function createHoverMarkdownString(
  translatedText: string,
  humanizeText: string | undefined,
  range: { start: any, end: any },
  document: { languageId: string },
): { md: MarkdownString, header: MarkdownString } {
  const space = "&nbsp;&nbsp;";

  const addSelection = `[$(heart)](command:${appName}.addSelection?${encodeURIComponent(
    JSON.stringify({ range: { start: range.start, end: range.end } })
  )} "Add Selection")`;

  const header = new MarkdownString(
    `[${appName}]${space}${addSelection}`,
    true
  );
  header.isTrusted = true;

  let showText = translatedText;
  if (humanizeText) {
    showText = `${humanizeText} => ${translatedText}`;
  }
  const codeDefine = "```";
  let md = new MarkdownString(
    `${codeDefine}${document.languageId}\n${showText}\n ${codeDefine}`
  );
  if (!translatedText) {
    md = new MarkdownString(
      `**Translate Error**: Check [OutputPanel](command:${appName}.openOutputPanel "open output panel") for details.`
    );
    md.isTrusted = true;
  }

  return { header, md };
}

/**
 * Automatic translation, which automatically detects languages based on source code
 * @param text Text to be translated
 * @returns Translated text
 */
async function autoMutualTranslate(text: string): Promise<string> {
  let targetLanguage = getAppConfigValue("parent_language");
  const engine = getAppConfigValue("defaultEngine") as Engines;
  try {
    let res = await translator.translate(text, { to: targetLanguage as ToLanguage<typeof engine>, engine }) as string[];
    return res.join("\n");
  } catch (error: any) {
    tipManager.error(error.message);
    throw error;
  }
}

function mergeContentToFirstHover(...hovers: (Hover | null)[]) {
  hovers = hovers.filter(it => it !== null);
  let firstHover = hovers.shift();
  if (!firstHover) {
    throw new Error("Can't get hover !");
  }

  firstHover.contents = hovers.reduce((pre, cur) => {
    return pre.concat(cur?.contents ?? []);
  }, firstHover.contents);

  return firstHover;
}

function getHoverId(document: TextDocument, position: Position) {
  return `${document.uri.toString()}-${position.line}-${position.character}`;
}
//-------------------------------------------------------------------------
// hover: comment translate
//-------------------------------------------------------------------------
export async function compileMarkdown(document: TextDocument, position: Position) {

  let text = document.lineAt(position).text;

  let { hasTranslated, result: translatedText } = await getMarkdownTextValue(text);
  let range = new Range(position.line, 0, position.line, text.length);

  return { hasTranslated, translatedText, range };
}
//-------------------------------------------------------------------------
export const hoverText = languages.registerHoverProvider('*', hoverHandler);
