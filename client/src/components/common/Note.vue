<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { DropdownOption, useLoadingBar, useMessage } from 'naive-ui';
import { EllipsisVertical } from '@vicons/ionicons5';
import { xss, marked, keyFunctionRunner, isNotForCurrentUser } from '../../utils';
import { useNote, useSaved } from '@stores';

interface Note {
	content: string;
	backgroundColor: string;
	notebookId: string;
	id: string;
	saved?: boolean;
	userId: string;
}

const router = useRouter();
const message = useMessage();
const loading = useLoadingBar();
const { deleteNote } = useNote();
const { saveNote, unsaveNote } = useSaved();

const p = defineProps<Note>();
/* eslint-disable vue/no-setup-props-destructure */
const { id } = p;

const isConfirm = ref(false);

const options = ref<DropdownOption[]>([
	{
		label: 'Delete',
		key: 'delete'
	},
	{
		label: 'Save',
		key: 'save'
	}
]);

function onConfirm() {
	loading.start();
	deleteNote({ id }).then(() => {
		loading.finish();
		message.info('Note deleted successfully');
	});
}

watchEffect(() => {
	const item = options.value.find(x => x.key === 'save' || x.key === 'unsave');
	const index = options.value.indexOf(item!);

	if (p.saved) {
		options.value[index] = { label: 'Unsave', key: 'unsave' };
	} else {
		options.value[index] = { label: 'Save', key: 'save' };
	}

	if (options.value.find(x => x.key === 'delete') && isNotForCurrentUser(p.userId)) {
		options.value.shift();
	}
});

const handleSelect = keyFunctionRunner({
	delete: () => {
		isConfirm.value = true;
	},
	save: () => {
		loading.start();
		saveNote({ id }).then(() => {
			loading.finish();
			message.success('Note saved');
		});
	},
	unsave: () => {
		loading.start();
		unsaveNote({ id }).then(() => {
			loading.finish();
			message.success('Note unsaved');
		});
	}
});
</script>

<template>
	<div
		class="note"
		:style="{ backgroundColor }"
		@click="() => router.push('/note/' + notebookId + '/' + id)"
	>
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
	padding: 0.8rem 1.2rem;
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
