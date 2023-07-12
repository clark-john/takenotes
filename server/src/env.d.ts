declare namespace NodeJS {
	interface ProcessEnv {
		JWT_SECRET: string;
		PORT: string;
		NODE_ENV: 'production' | 'development' | 'test';
	}
}
