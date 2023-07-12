import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import unplugin from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
	plugins: [
		vue(),
		checker({
			vueTsc: true,
			typescript: true,
			eslint: {
				lintCommand: "eslint ./src/**/*.{vue,ts}"
			}
		}),
		unplugin({
			resolvers: [NaiveUiResolver()]
		})
	],
	resolve: {
		alias: [
			{
				find: resolve(__dirname, "src/stores"),
				replacement: "@stores"
			},
			{
				find: resolve(__dirname, "src/pages"),
				replacement: "@pages"
			}
		]
	}
});
