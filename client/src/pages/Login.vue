<script lang="ts" setup>
import { ref } from 'vue';

const isLogin = ref(true);

</script>

<template>
	<div class="main">
		<div class="nbs">
			<div class="rooftop">Take Notes</div>
			<img src="/notebooks.svg" alt="notebooks" height="700" />
		</div>
		<div class="login">
			<LoginForm @register-form="isLogin = false" v-if="isLogin" />
			<RegisterForm v-else @login-form="isLogin = true" />
		</div>
		<div class="switch">
			<ThemeSwitcher />
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
