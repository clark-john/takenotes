import { Router } from 'vue-router';
import { discreteApi } from './discreteApi';

export * from './emitStorageEvent';

export function removeGraphqlBracket(message: string) {
	return message.replace(/\[GraphQL\]\s*/, '');
}

export function clearValues(obj: any): any {
	for (const x of Object.keys(obj)) {
		obj[x] = '';
	}
	return obj;
}

const dcapi = discreteApi();

export const launchSessionErrorDialog = (() => {
	let exec = false;
	return (router: Router) => {
		if (!exec) {
			dcapi.dialog.error({
				title: 'Error',
				content: 'Session expired. Please relogin.',
				closable: false,
				onEsc() {
					return false;
				},
				onMaskClick(_e: any) {
					return false;
				},
				onPositiveClick(_e: any) {
					router.push('/login').then(() => {
						console.clear();
						localStorage.removeItem('token');
					});
				},
				positiveText: 'Ok'
			});
			exec = true;
		}
	};
})();
