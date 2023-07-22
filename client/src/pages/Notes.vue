<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useNote, useNotebook } from '@stores';
import { ref, watchEffect, Ref } from 'vue';
import { Note, GetNotebookInfoQuery } from '@generated';

const route = useRoute();
const { getNotes } = useNote();
const { getNotebookInfo } = useNotebook();

const { data, fetching } = getNotes(route.params.id as string);
const { data: d, fetching: fetch } = getNotebookInfo(route.params.id as string);

const notes: Ref<Note[] | undefined> = ref();

watchEffect(() => {
	if (data.value && d.value) {
		notes.value = data.value.getNotes;
		console.log(d.value);
	}
});
</script>

<template>
	<PaddingWrapper value="2rem">
		<div v-if="fetching || fetch">
			<n-spin></n-spin>
		</div>
		<div v-else>
			<div>{{ (d as GetNotebookInfoQuery).getNotebookInfo?.name }}</div>
			<div v-for="x in notes" :key="notes?.indexOf(x)">
				{{ x }}
			</div>
		</div>
	</PaddingWrapper>
</template>
