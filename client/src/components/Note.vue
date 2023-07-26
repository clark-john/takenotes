<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DropdownOption, useMessage } from 'naive-ui';
import { EllipsisVertical } from '@vicons/ionicons5';
import { xss, marked, keyFunctionRunner } from '../utils';
import { useNote } from '@stores';

interface Note {
	content: string;
	backgroundColor: string;
	notebookId: string;
	id: string;
}

const router = useRouter();
const message = useMessage();
const { deleteNote } = useNote();

/* eslint-disable vue/no-setup-props-destructure */
const { id } = defineProps<Note>();

const isConfirm = ref(false);

const options: DropdownOption[] = [
	{
		label: "Delete",
		key: "delete"
	}
];

function onConfirm(){
	deleteNote({ id }).then(() => {
		message.info("Note deleted successfully");
	});
}

const handleSelect = keyFunctionRunner({
	delete: () => {
		isConfirm.value = true;
	}
});

</script>

<template>
	<div class="note" :style="{ backgroundColor }" @click="() => router.push('/note/' + notebookId + '/' + id)">
		<ConfirmDelete 
			@close="isConfirm = false" 
			:show="isConfirm"
			@confirm="onConfirm"
		/>
		<n-dropdown :options="options" @select="handleSelect">
			<n-icon size="16">
				<EllipsisVertical />
			</n-icon>
		</n-dropdown>
		<div class="content">
			<span v-html="xss(marked.parse(content))"></span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.note {
	color: black;
	border-radius: 6px;
	padding: .8rem 1.2rem;
	height: 250px;
	position: relative;
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
	i {
		position: absolute;
		right: 9px;
	}
}
</style>
