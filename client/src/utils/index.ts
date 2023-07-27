import { filterXSS, whiteList } from 'xss';

// reexports
export { addAntiSpecialChars } from './antiSpecialChars';
export { launchSessionErrorDialog } from './sessionErrDialog';
export { marked } from './marked';

export function removeGraphqlBracket(message: string) {
	return message.replace(/\[GraphQL\]\s*/, '');
}

export function clearValues(obj: any): any {
	for (const x of Object.keys(obj)) {
		obj[x] = '';
	}
	return obj;
}

export const xss = (content: string) => {
	return filterXSS(content, {
		whiteList: {
			...whiteList,
			input: ['disabled', 'checked', 'type'],
			span: ['class']
		},
		onTagAttr: (_tag, name, value, _isWhiteAttr) => {
			if (name === 'type' && value !== 'checkbox') {
				return "style='display: none'";
			}
		}
	});
};

export function keyFunctionRunner(objOfFuncs: Record<string, () => void>) {
	return (key: string) => {
		(objOfFuncs[key] ?? (() => {}))();
	};
}
