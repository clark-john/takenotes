<script lang="ts" setup>
defineProps<{
	text?: string;
}>();
</script>

<template>
	<div class="spin">
		<n-spin size="large" />
		{{ text || '' }}
	</div>
</template>

<style lang="scss" scoped>
.spin {
	display: grid;
	justify-content: center;
	height: 70vh;
	align-content: center;
	row-gap: 19px;
}
</style>
