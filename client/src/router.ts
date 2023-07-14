import { h } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
	// some routes would have
	{
		path: '/',
		component: h(MainLayout, { withNavbar: true }),
		children: [
			{
				path: '',
				component: () => import("./pages/Index.vue"),
			},
			{
				path: 'clark',
				component: () => import('./components/RegisterForm.vue')
			}
		]
	},
	// login has no navbar
	{
		path: '/login',
		component: h(MainLayout, { withNavbar: false }),
		children: [
			{
				path: '',
				component: () => import("./pages/Login.vue")
			}
		]
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

export default router;
