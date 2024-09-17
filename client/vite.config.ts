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
			// vueTsc: true,
			typescript: true,
			eslint: {
				lintCommand: 'eslint ./src/**/*.{vue,ts}'
			}
		}),
		unplugin({
			resolvers: [NaiveUiResolver()]
		})
	], //
	resolve: {
		alias: [
			{
				find: '@stores',
				replacement: resolve(__dirname, './src/stores')
			},
			{
				find: '@generated',
				replacement: resolve(__dirname, 'src/generated.ts')
			},
			{
				find: '@types',
				replacement: resolve(__dirname, 'src/types')
			},
			{
				find: 'styles',
				replacement: resolve(__dirname, 'src/styles')
			}
		]
	}
});
