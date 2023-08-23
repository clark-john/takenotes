import { createApp } from 'vue';
import urql, { cacheExchange, fetchExchange } from '@urql/vue';
import { createPinia } from 'pinia';
import { type Router } from 'vue-router';
import './style.scss';
import 'highlight.js/styles/a11y-light.css';
import App from './App.vue';
import router from './router';
import { auth, retry } from './exchanges';

const { VITE_SERVER_URL, DEV } = import.meta.env;

declare global {
	interface Window {
		baseUrl: string;
		getToken: () => string | null;
		setToken: (token: string) => void;
		removeToken: () => void;
		$router: Router;
	}
}

const pinia = createPinia();

const baseUrl = VITE_SERVER_URL;

if (DEV) {
	window.baseUrl = baseUrl;
	window.getToken = () => localStorage.getItem('token');
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
		exchanges: [cacheExchange, retry, auth(baseUrl, router), fetchExchange],
		fetchOptions() {
			return {
				credentials: 'include'
			};
		},
		requestPolicy: 'cache-and-network'
	});

app.config.performance = true;
app.mount('#app');
