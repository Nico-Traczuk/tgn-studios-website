import { marked } from 'marked';

export function markdownToHtml(markdown: string) {
  return marked.parse(markdown, { async: false, gfm: true }) as string;
}
