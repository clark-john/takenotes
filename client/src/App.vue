<script setup lang="ts">
import { darkTheme, GlobalTheme } from 'naive-ui';
import { onMounted, ref, Ref } from 'vue';

const themeRef: Ref<GlobalTheme | null> = ref(null);
const body = document.body;

function checkTheme() {
	const theme = localStorage.getItem('theme');
	if (theme === 'dark') {
		themeRef.value = darkTheme;
		body.classList.add('dark');
	} else {
		themeRef.value = null;
		body.classList.remove('dark');
	}
}

onMounted(() => {
	checkTheme();
	
	/* if (!localStorage.getItem("prefer-color-notes")) {
		localStorage.setItem("prefer-color-notes", "true");
	} */

	window.addEventListener('setTheme', (ev: Event) => {
		localStorage.setItem('theme', (ev as CustomEvent).detail);
		checkTheme();
	});
	setTimeout(() => {
		body.classList.add('transition');
	}, 80);
});

// const token: Ref<string | null> = ref(localStorage.getItem("token"));
// const url = import.meta.env.VITE_SERVER_URL;

/*watchEffect(() => {
	fetch(url + "/refresh", {
		method: "POST"
	}).then(x => x.json()).then(x => {
		loading.value = false;
		localStorage.setItem("token", x.accessToken);
	});
});*/
</script>

<template>
	<n-config-provider :theme="themeRef">
		<n-message-provider>
			<n-dialog-provider>
				<n-loading-bar-provider>
					<router-view></router-view>
				</n-loading-bar-provider>
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>
