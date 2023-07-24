import { authExchange } from '@urql/exchange-auth';
import type { Router } from 'vue-router';
import { launchSessionErrorDialog } from '../utils';

const initializeAuthState = (): string => {
	return localStorage.getItem('token') || '';
};

export const auth = (baseUrl: string, router: Router) =>
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
			async refreshAuth() {
				if (token) {
					// only called when fetching for refresh token
					const f = await fetch(baseUrl + '/refresh', {
						method: 'POST',
						credentials: 'include'
					});
					if (f.status < 400) {
						localStorage.setItem('token', (await f.json()).accessToken);
						token = initializeAuthState();
						console.clear();
						console.log('refreshed');
					} else {
						launchSessionErrorDialog(router);
					}
				}
			}
		};
	});
