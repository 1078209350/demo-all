import Markdown from 'markdown-it'
import highlight from 'highlight.js'
import { imgSize } from '@mdit/plugin-img-size'

const mdOptions: Markdown.Options = {
  html: true,
  // 设成 true 来自动转化像 URL 的文本成链接
  linkify: true,
  // 设成 true 来启用某些语言中性的替换以及引号的美化（智能引号）。
  typographer: true,
  // 设成 true 来转化段落里的 \n 成 <br>。
  breaks: true,
  // 给围栏代码块的 CSS 语言类前缀。对拓展的高亮器来说很有用
  langPrefix: 'language-',
  // 代码高亮
  highlight(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' + highlight.highlight(lang, str, true).value + '</code></pre>'
        )
      } catch (__) {}
    }
    return ''
  }
}

const markdown = new Markdown(mdOptions)
markdown.use(imgSize)

// <a></a>标签样式处理 linkify: false
const defaultRender =
  markdown.renderer.rules.link_open ||
  function (tokens, idx, options, _, self) {
    return self.renderToken(tokens, idx, options)
  }
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    const { attrs } = tokens[idx]
    if (attrs) {
      attrs[aIndex][1] = '_blank'
    }
  }
  // tokens[idx].attrPush([
  //   'style',
  //   'display:block;font-weight:600;font-size:18px;text-decoration:none;border-radius:10px;background:#EEF3FF;padding:25px 30px;color:#484F5F;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'
  // ])
  return defaultRender(tokens, idx, options, env, self)
}

export const md = markdown
