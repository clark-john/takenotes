import { createApp } from 'vue';
import urql, { cacheExchange, fetchExchange } from '@urql/vue';
import { retryExchange } from '@urql/exchange-retry';
import { createPinia } from 'pinia';
import { Router } from 'vue-router';
import './style.scss';
import App from './App.vue';
import router from './router';
import { auth } from './exchanges';

const { VITE_SERVER_URL, DEV } = import.meta.env;

declare global {
	interface Window {
		baseUrl: string;
		getToken: () => string;
		setToken: (token: string) => void;
		removeToken: () => void;
		$router: Router;
	}
}

const pinia = createPinia();

const baseUrl = VITE_SERVER_URL;

if (DEV) {
	window.baseUrl = baseUrl;
	window.getToken = () => localStorage.getItem('token') ?? '';
	window.setToken = (token: string) => localStorage.setItem('token', token);
	window.removeToken = () => localStorage.removeItem('token');
	window.$router = router;
}

router.beforeEach((to, _from, next) => {
	if (to.path !== '/login') {
		if (!localStorage.getItem('token')) {
			return next('/login');
		}
	}
	next();
});

const app = createApp(App)
	.use(pinia)
	.use(router)
	.use(urql, {
		url: baseUrl + '/graphql',
		exchanges: [
			cacheExchange, 
			auth(baseUrl, router),
			retryExchange({
				initialDelayMs: 1000,
				maxDelayMs: 5000,
				randomDelay: true,
				maxNumberAttempts: 2
			}),
			fetchExchange
		],
		fetchOptions() {
			return {
				credentials: 'include'
			};
		}
	});

app.config.performance = true;
app.mount('#app');
