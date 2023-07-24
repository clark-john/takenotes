<script setup lang="ts">
defineProps<{
	value: string;
}>();
</script>
<template>
	<div :style="{ padding: value }">
		<slot />
	</div>
</template>
