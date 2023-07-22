import { authExchange } from '@urql/exchange-auth';
import type { Router } from 'vue-router';
import { launchSessionErrorDialog } from '../utils';

const initializeAuthState = (): string => {
	return localStorage.getItem('token') || '';
};

export const auth = (_baseUrl: string, router: Router) =>
	authExchange(async utils => {
		let token = initializeAuthState();
		return {
			addAuthToOperation: operation => {
				token = initializeAuthState();
				return utils.appendHeaders(operation, {
					Authorization: `Bearer ${token}`
				});
			},
			didAuthError(err, _operation) {
				return err.message.includes('Unauthorized');
			},
			willAuthError(_operation) {
				return false;
			},
			async refreshAuth() {
				if (token) {
					// only called when fetching for refresh token
					launchSessionErrorDialog(router);
				}
			}
		};
	});
