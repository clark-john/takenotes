import { defineStore } from "pinia";
import { ref, Ref } from "vue";

type Theme = "light" | "dark";

export const useTheme = defineStore("theme", () => {
	const theme: Ref<Theme> = ref(localStorage.getItem("theme") as Theme ?? 'light');
	function setTheme(themeArg: Theme){
		theme.value = themeArg;
		window.dispatchEvent(new CustomEvent("setTheme", { detail: themeArg }));
	}
	return { theme, setTheme };
});
