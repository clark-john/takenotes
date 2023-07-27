<script lang="ts" setup>
import { useMessage, InputProps } from 'naive-ui';
import { ref } from 'vue';

const name = ref('');
const message = useMessage();
const valStatus = ref<InputProps['status']>();

defineProps<{ show: boolean }>();

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'rename', name: string): void;
}>();

function handleClick() {
	if (!name.value) {
		valStatus.value = 'error';
		message.error('Name is required', { duration: 1500 });
	} else {
		valStatus.value = undefined;
		emit('rename', name.value);
		emit('close');
	}
}
</script>

<template>
	<n-popover trigger="click" :show="show" @clickoutside="emit('close')">
		<template #trigger><div class="rename"></div></template>
		<div class="content">
			<div style="margin-bottom: 7px">Rename</div>
			<n-input
				placeholder="Enter name"
				v-model:value="name"
				:status="valStatus"
			/>
			<n-button type="primary" size="small" @click="handleClick"
				>Rename</n-button
			>
		</div>
	</n-popover>
</template>

<style lang="scss" scoped>
.content {
	padding-bottom: 6px;
	display: grid;
	.n-button {
		justify-self: end;
		margin-top: 9px;
	}
}
.rename {
	right: 1rem;
	position: absolute;
}
</style>
