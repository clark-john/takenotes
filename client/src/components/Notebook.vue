<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { EllipsisVertical } from '@vicons/ionicons5';
import { DropdownOption, useLoadingBar, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useNotebook } from '@stores';

const { deleteNotebook, updateNotebook } = useNotebook();
const router = useRouter();
const message = useMessage();
const loading = useLoadingBar();

const isShowDeleteConfirm = ref(false);
const isShowRename = ref(false);

/* eslint-disable vue/no-setup-props-destructure */
const { id } = defineProps<{
	bg: string;
	name: string;
	id: string;
}>();

function goToNotes() {
	router.push('/notes/' + id);
}

const options: DropdownOption[] = [
	{
		label: "Delete",
		key: "delete"
	},
	{
		label: "Rename",
		key: "rename"
	}
];

function deleteNb(){
	loading.start();
	deleteNotebook({ id }).then(result => {
		const name = result.data?.deleteNotebook.name;
		loading.finish();
		message.info("Notebook " + name + " deleted successfully", { duration: 1500 });
	});
}

function renameNb(name: string){
	loading.start();
	updateNotebook({ id, name }).then(() => {
		loading.finish();
		message.success("Notebook renamed successfully", { duration: 1500 });
	});
}

function handleDropdown(e: 'delete' | 'rename'){
	const obj = {
		delete: () => {
			isShowDeleteConfirm.value = true;
		},
		rename: () => {
			isShowRename.value = true;
		}
	}
	obj[e]();
}

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
