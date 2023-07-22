<script lang="ts" setup>
import { useTheme } from '@stores/themeStore';
import { ref } from 'vue';

const store = useTheme();

const { setTheme, theme } = store;

const active = ref<boolean>(theme === 'dark');

function handleUpdate(ev: boolean) {
	setTheme(ev ? 'dark' : 'light');
}
</script>

<template>
	<div class="main">
		<div class="nbs">
			<div class="rooftop">Take Notes</div>
			<img src="/notebooks.svg" alt="notebooks" height="700" />
		</div>
		<div class="login">
			<LoginForm />
		</div>
		<div class="switch">
			<n-switch
				size="large"
				@update:value="handleUpdate"
				v-model:value="active"
			>
				<template #checked> Dark </template>
				<template #unchecked> Light </template>
			</n-switch>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.main {
	.nbs {
		.rooftop {
			font-size: 2.4rem;
			font-weight: 500;
		}
		display: grid;
		justify-items: center;
	}
	.login {
	}
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100%;

	.switch {
		position: absolute;
		right: 1.2rem;
		top: 1.2rem;
		display: flex;
		align-items: center;
		column-gap: 11px;
	}
}

@media only screen and (max-width: 1092px) {
	.main {
		display: grid;
		align-items: unset;
		align-content: center;
		row-gap: 3rem;
	}
	img {
		height: 100px;
	}
}

@media only screen and (max-width: 420px) {
	.main {
		display: grid;
		align-items: unset;
		align-content: center;
		row-gap: 3rem;
	}
	img {
		height: 100px;
	}
}
</style>

<style lang="scss">
body,
html,
#app,
.n-config-provider {
	height: 100%;
}
</style>
