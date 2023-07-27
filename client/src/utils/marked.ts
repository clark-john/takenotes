import hljs from 'highlight.js';
import { marked as markdown } from 'marked';
import { markedHighlight } from 'marked-highlight';

export const marked = markdown.setOptions({ mangle: false, headerIds: false });

marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);
