/// <reference types="vite/client" />

// moduleRes to node
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

declare interface ImportMetaEnv {
	VITE_SERVER_URL: string;
}
