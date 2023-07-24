<script lang="ts" setup>
import { marked } from 'marked';
import { useRouter } from 'vue-router';
import xss from 'xss';

const m = marked.setOptions({ mangle: false, headerIds: false });

interface Note {
	content: string;
	backgroundColor: string;
	notebookId: string;
	id: string;
}

const router = useRouter();

defineProps<Note>();
</script>

<template>
	<div class="note" :style="{ backgroundColor }" @click="() => router.push('/note/' + notebookId + '/' + id)">
		<div class="content">
			<span v-html="xss(m.parse(content))"></span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.note {
	color: black;
	border-radius: 6px;
	padding: 1.2rem;
	height: 250px;
	overflow: hidden;
	.content {
		text-overflow: ellipsis;
		word-wrap: break-word;
		height: calc(250px - (1.2rem * 2));
		overflow: hidden;
	}
	&:hover {
		cursor: pointer;
	}
}
</style>
