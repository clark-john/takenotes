import { h } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
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
			},
			{
				path: 'note/:notebookId/:id',
				component: () => import('./pages/NoteEditor.vue')
			},
			{
				path: 'settings',
				component: () => import('./pages/Settings.vue')
			},
			{
				path: 'saved',
				component: () => import('./pages/Saved.vue')
			}
		]
	},
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
