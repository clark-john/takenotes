import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('./pages/Index.vue')
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

export default router;
