<script lang="ts" setup>
import { GetNotebookInfoQuery } from '@generated';
import { ChevronBack } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

defineProps<{
	ninfo?: GetNotebookInfoQuery;
}>();

const emit = defineEmits<{
	(e: 'addBlankNote'): void;
}>();

const router = useRouter();
</script>

<template>
	<div class="top">
		<div class="link" @click="router.back">
			<n-icon size="40">
				<ChevronBack />
			</n-icon>
		</div>
		<div class="notebook-name">
			{{ ninfo?.getNotebookInfo?.name }}
		</div>
		<n-button
			@click="emit('addBlankNote')"
			:class="ninfo?.getNotebookInfo ? '' : 'hidden'"
		>
			Add Note
		</n-button>
	</div>
</template>

<style lang="scss" scoped>
.top {
	.notebook-name {
		font-size: 1.5rem;
	}
}
.hidden {
	visibility: hidden;
}

.link {
	&:hover {
		cursor: pointer;
	}
}
</style>
