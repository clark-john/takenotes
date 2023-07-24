import { FormItemRule, FormRules } from 'naive-ui';

const antiSpecialChars = (_rule: FormItemRule, val: string) => {
	/* eslint-disable no-useless-escape */
	if (/[\^'"&(){};:\[\]<>,]/g.test(val)) {
		return new Error('Must not contain special characters');
	}
	return true;
};

// every form rule item should be an array
export function addAntiSpecialChars(rules: FormRules): void {
	for (const x of Object.keys(rules)) {
		const r = rules[x];
		if (r instanceof Array) {
			(r as Array<FormItemRule>).push({
				validator: antiSpecialChars
			});
		} else {
			throw new Error('Form rule item should be an array');
		}
	}
}
