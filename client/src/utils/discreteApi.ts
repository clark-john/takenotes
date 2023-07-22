import { darkTheme, createDiscreteApi, GlobalTheme } from 'naive-ui';

export const discreteApi = () => {
	let configTheme: GlobalTheme | null = null;
	const theme = localStorage.getItem('theme');
	if (theme === 'dark') {
		configTheme = darkTheme;
	}
	const dcapi = createDiscreteApi(['dialog'], {
		configProviderProps: {
			theme: configTheme
		}
	});
	return dcapi;
};
