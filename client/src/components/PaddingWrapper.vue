<script setup lang="ts">
const props = defineProps<{
	value: string;
}>();
</script>
<template>
	<div :style="{ padding: props.value }">
		<slot />
	</div>
</template>
