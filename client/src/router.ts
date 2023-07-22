import { h } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
	// some routes would have
	{
		path: '',
		component: h(MainLayout, { withNavbar: true }),
		children: [
			{
				path: '',
				component: () => import('./pages/Index.vue')
			},
			{
				path: 'notes/:id',
				component: () => import('./pages/Notes.vue')
			}
		]
	},
	// login has no navbar
	{
		path: '',
		component: h(MainLayout, { withNavbar: false }),
		children: [
			{
				path: '/login',
				component: () => import('./pages/Login.vue')
			},
			{
				path: '/:pathMatch(.*)*',
				component: () => import('./pages/NotFound.vue')
			}
		]
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

export default router;
