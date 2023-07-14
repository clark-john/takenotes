import { createApp } from 'vue';
import urql, { cacheExchange, fetchExchange } from '@urql/vue';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
import router from './router';
import { auth } from './exchanges';
import { MeDoc } from '@generated';

const { VITE_SERVER_URL, DEV } = import.meta.env;

declare global {
	interface Window {
		baseUrl: string;
		getToken: () => string;
	}
}

const pinia = createPinia();

const baseUrl = VITE_SERVER_URL;

if (DEV) {
	window.baseUrl = baseUrl;
	window.getToken = () => localStorage.getItem("token") ?? '';
}

const app = createApp(App)
	.use(pinia)
	.use(router)
	.use(urql, {
		url: baseUrl + "/graphql",
		exchanges: [
			cacheExchange,
			auth(baseUrl, router), 
			fetchExchange
		]
	});

const token = localStorage.getItem("token");

router.beforeEach(async (to, _from, next) => {
	const isLogin = to.path === '/login';
	if (!isLogin) {
		const res = await fetch(baseUrl + "/graphql", {
			headers: {
				'Authorization': 'Bearer ' + token ?? '',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ query: MeDoc.loc?.source.body, variables: {} })
		})
		if (res.status === 401) {
			console.clear();
			return next("/login");
		}
	}
	next();
})

app.config.performance = true;
app.mount('#app');
