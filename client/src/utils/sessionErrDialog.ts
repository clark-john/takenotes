import { Router } from 'vue-router';
import { discreteApi } from './discreteApi';

const dcapi = discreteApi();

export const launchSessionErrorDialog = (() => {
	let exec = false;
	return (router: Router) => {
		if (!exec) {
			dcapi.dialog.info({
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
