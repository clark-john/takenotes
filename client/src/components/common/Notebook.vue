<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { EllipsisVertical } from '@vicons/ionicons5';
import { DropdownOption, useLoadingBar, useMessage } from 'naive-ui';
import { ref, watchEffect } from 'vue';
import { useNotebook, useSaved } from '@stores';
import { keyFunctionRunner, isNotForCurrentUser } from '../../utils';

const { deleteNotebook, updateNotebook } = useNotebook();
const { saveNotebook, unsaveNotebook } = useSaved();

const router = useRouter();
const message = useMessage();
const loading = useLoadingBar();

const isShowDeleteConfirm = ref(false);
const isShowRename = ref(false);

const p = defineProps<{
	bg: string;
	name: string;
	id: string;
	saved: boolean;
	userId: string;
}>();
/* eslint-disable vue/no-setup-props-destructure */
const { id } = p;

function goToNotes() {
	router.push('/notes/' + id);
}

const options = ref<DropdownOption[]>([
	{
		label: 'Delete',
		key: 'delete'
	},
	{
		label: 'Rename',
		key: 'rename'
	},
	{
		label: 'Save',
		key: 'save'
	}
]);

watchEffect(() => {
	if (isNotForCurrentUser(p.userId)) {
		options.value.splice(0, 2);
	}

	const item = options.value.find(x => x.key === 'save' || x.key === 'unsave');
	const index = options.value.indexOf(item!);

	if (p.saved) {
		options.value[index] = { label: 'Unsave', key: 'unsave' };
	} else {
		options.value[index] = { label: 'Save', key: 'save' };
	}
});

function deleteNb() {
	loading.start();
	deleteNotebook({ id }).then(result => {
		const name = result.data?.deleteNotebook.name;
		loading.finish();
		message.info('Notebook ' + name + ' deleted successfully');
	});
}

function renameNb(name: string) {
	loading.start();
	updateNotebook({ id, name }).then(() => {
		loading.finish();
		message.success('Notebook renamed successfully');
	});
}

const handleDropdown = keyFunctionRunner({
	delete: () => {
		isShowDeleteConfirm.value = true;
	},
	rename: () => {
		isShowRename.value = true;
	},
	save: () => {
		loading.start();
		saveNotebook({ id }).then(result => {
			if (result.data) {
				loading.finish();
				message.success(
					'Notebook "' + result.data.saveNotebook.name + '" saved'
				);
			}
		});
	},
	unsave: () => {
		loading.start();
		unsaveNotebook({ id }).then(result => {
			if (result.data) {
				loading.finish();
				message.success(
					`Notebook "${result.data.unsaveNotebook.name}" unsaved`
				);
			}
		});
	}
});
</script>

<template>
	<div class="main">
		<div :style="{ backgroundColor: bg }" class="nb" @click="goToNotes">
			<ConfirmDelete
				:show="isShowDeleteConfirm"
				@confirm="deleteNb"
				@close="isShowDeleteConfirm = false"
			/>
			<RenameNotebook
				:show="isShowRename"
				@close="isShowRename = false"
				@rename="renameNb"
			/>
			<n-dropdown :options="options" @select="handleDropdown">
				<n-icon size="20">
					<EllipsisVertical />
				</n-icon>
			</n-dropdown>
		</div>
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
		position: relative;
		i {
			position: absolute;
			top: 10px;
			right: 7px;
		}
	}
	display: grid;
	row-gap: 9px;
	justify-items: center;
}
</style>
