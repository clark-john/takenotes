/// <reference types="vite/client" />

declare module '*.vue' {}

declare interface ImportMetaEnv {
	VITE_SERVER_URL: string;
}
