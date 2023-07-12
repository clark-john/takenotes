import { createApp } from 'vue';
import urql, { cacheExchange, fetchExchange } from '@urql/vue';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
	.use(urql, {
		url: `${import.meta.env.VITE_SERVER_URL}/graphql`,
		exchanges: [cacheExchange, fetchExchange]
	})
	.use(pinia)
	.use(router)
	.mount('#app');
