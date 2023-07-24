<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

/* eslint-disable vue/no-setup-props-destructure */
const { id } = defineProps<{
	bg: string;
	name: string;
	id: string;
}>();
function goToNotes() {
	router.push('/notes/' + id);
}
</script>
<template>
	<div class="main">
		<div :style="{ backgroundColor: bg }" class="nb" @click="goToNotes"></div>
		<div class="name">{{ name }}</div>
	</div>
</template>

<style lang="scss" scoped>
$radius: 7px;

.main {
	width: 200px;
	.nb {
		height: 290px;
		width: 100%;
		border-top-right-radius: $radius;
		border-bottom-right-radius: $radius;
		transition: scale 150ms ease-in-out;
		&:hover {
			cursor: pointer;
			scale: 1.03;
		}
	}
	display: grid;
	row-gap: 9px;
	justify-items: center;
}
</style>
