<script lang="ts" setup>
import { useNotebook } from '@stores/notebookStore';
import { NotebookInput } from '@types';
import { FormInst, FormRules, useDialog } from 'naive-ui';
import { ref } from 'vue';
import { AddNotebook, AddNotebookMutation } from '@generated';
import { addAntiSpecialChars, clearValues } from '../utils';

const p = defineProps<{
	show: boolean;
}>();

const emitter = defineEmits<{
	(e: 'close'): void;
}>();

const formRef = ref<FormInst | null>(null);
const dialog = useDialog();

const notebookValue = ref<NotebookInput>({
	name: '',
	description: ''
});

const rules: FormRules = {
	name: [
		{
			required: true
		}
	]
};

addAntiSpecialChars(rules);

const { addNotebook } = useNotebook();

function create() {
	formRef.value?.validate(errs => {
		if (!errs) {
			addNotebook(notebookValue.value as AddNotebook).then(result => {
				const nb = (result.data as AddNotebookMutation)?.createNotebook;
				dialog.success({
					title: 'Success',
					content: `Notebook "${nb.name}" created successfully`,
					positiveText: 'Ok'
				});
				emitter('close');
				notebookValue.value = clearValues(notebookValue.value);
			});
		}
	});
}
</script>
<template>
	<n-modal
		:show="p.show"
		:mask-closable="true"
		:close-on-esc="true"
		:style="{ width: '470px' }"
		preset="card"
		size="large"
		@esc="() => emitter('close')"
		@mask-click="() => emitter('close')"
		@close="emitter('close')"
	>
		<template #header> Add Notebook </template>
		<n-form ref="formRef" size="medium" :model="notebookValue" :rules="rules">
			<n-form-item label="Name" path="name">
				<n-input
					v-model:value="notebookValue.name"
					placeholder="Enter text"
				></n-input>
			</n-form-item>
			<n-form-item label="Description" path="description">
				<n-input
					v-model:value="notebookValue.description"
					placeholder="Enter description"
				></n-input>
			</n-form-item>
			<n-button @click="create">Submit</n-button>
		</n-form>
	</n-modal>
</template>

<style lang="scss" scoped>
button {
	justify-self: end;
}
form {
	display: grid;
	row-gap: 1rem;
}
</style>
