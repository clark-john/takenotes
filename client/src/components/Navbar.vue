<script lang="ts" setup>
import { useUser } from '@stores';

const { getCurrent } = useUser();

const { data, fetching } = getCurrent();
</script>

<template>
	<nav>
		<div class="title">
			<img src="/favicon.svg" alt="" height="30" />
			TakeNotes
		</div>
		<div v-if="data" class="data">
			<ProfileMenu :name="data.me.firstName" />
		</div>
		<div v-else-if="fetching">Loading user...</div>
	</nav>
</template>

<style lang="scss" scoped>
@use 'styles' as *;

nav {
	.title {
		font-weight: 600;
		display: flex;
		column-gap: 10px;
		align-items: center;
		font-size: 1.3rem;
	}
	display: flex;
	align-items: center;
	padding: 10px 20px;
	justify-content: space-between;
	background-color: $light-nav-color;
	transition: addTrans(background-color);
}
.data:hover {
	cursor: pointer;
}
</style>

<style lang="scss">
@use 'styles' as *;

body.dark {
	nav {
		background-color: darken($dark-bg-color, 2%);
	}
}
</style>
