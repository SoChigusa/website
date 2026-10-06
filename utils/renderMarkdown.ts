import { marked } from 'marked';
import hljs from 'highlight.js';

// Material Design's standard Content Copy icon.
const copyIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';

const escapeHtml = (text: string) => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export default function renderMarkdown(markdown: string, copyLabel: string) {
  const renderer = new marked.Renderer();
  renderer.code = (code, codeInfo) => {
    const [lang, fileName] = typeof codeInfo === 'undefined' ? [undefined, undefined] : codeInfo.split(':');
    const langClass = lang === undefined ? 'bash' : (hljs.getLanguage(lang) ? lang : 'plaintext');
    const codeBlockClass = fileName === undefined ? 'code-block-no-info' : 'code-block';
    const highlightedCode = hljs.highlight(code, { language: langClass }).value;
    const fileInfo = fileName === undefined ? '' : `<span class="code-info">${escapeHtml(fileName)}</span>`;

    return `<div class="code-block-container"><button type="button" class="code-copy-button" aria-label="${escapeHtml(copyLabel)}" title="${escapeHtml(copyLabel)}">${copyIcon}</button><pre>${fileInfo}<code class="hljs ${codeBlockClass} language-${langClass}">${highlightedCode}</code></pre></div>`;
  };

  return marked(markdown, { renderer });
}
