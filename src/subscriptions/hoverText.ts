import { HoverProvider, languages, Hover } from 'vscode'

const hoverHandler: HoverProvider = {
  async provideHover(document, position, token) {
    /*
    TODO: 
    1. 获取配置，是否启用hover翻译
      否：return
      是：continue

    2. 构建hoverId，让后将其缓存，避免重复翻译
      当前hoverId 是否在翻译中
        是：return，显示加载中loading
        否：加入翻译队列
  	
    3. 展示hover翻译内容
    */

    return new Hover('Hover content');
  }
}

export const hoverText = languages.registerHoverProvider('*', hoverHandler);


