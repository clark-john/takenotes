<script setup lang="ts">
import { darkTheme, GlobalTheme } from 'naive-ui';
import { onMounted, ref, Ref } from 'vue';

const themeRef: Ref<GlobalTheme | null> = ref(null);
const body = document.body;

function checkTheme(){
	const theme = localStorage.getItem("theme");
	if (theme === 'dark') {
		themeRef.value = darkTheme;
		body.classList.add("dark");
	}	else {
		themeRef.value = null;
		body.classList.remove("dark");
	}
}

onMounted(() => {
	checkTheme();
	window.addEventListener("setTheme", (ev: Event) => {
		localStorage.setItem("theme", (ev as CustomEvent).detail);
		checkTheme();
	});
	setTimeout(() => {
		body.classList.add("transition");
	}, 80);
});
</script>

<template>
	<n-config-provider :theme="themeRef">
		<n-message-provider>
			<n-loading-bar-provider>
				<router-view></router-view>
			</n-loading-bar-provider>
		</n-message-provider>
	</n-config-provider>
</template>
