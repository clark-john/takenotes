<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useNote, useNotebook } from '@stores';
import { ref, watchEffect } from 'vue';
import { Note as NoteModel } from '@generated';

const route = useRoute();
const { getNotes, createBlankNote } = useNote();
const { getNotebookInfo } = useNotebook();
const notebookId = route.params.id as string;

const { data, fetching } = getNotes(notebookId);
const { data: ninfo, fetching: fetch } = getNotebookInfo(notebookId);

const notes = ref<NoteModel[] | undefined>();

watchEffect(() => {
	if (data.value && ninfo.value) {
		notes.value = data.value.getNotes;
	}
});

function addBlankNote() {
	createBlankNote({ id: notebookId }).then(res => {
		notes.value?.push(res.data!.createBlankNote);
	});
}
</script>

<template>
	<PaddingWrapper value="2rem">
		<div v-if="fetching || fetch">
			<CenteredSpin text="Loading your notes inside this notebook" />
		</div>
		<div v-else-if="!ninfo?.getNotebookInfo" class="main">
			<NotesTopPart :ninfo="ninfo" />
			<div class="not-found">Notebook not found</div>
		</div>
		<div v-else class="main">
			<NotesTopPart :ninfo="ninfo" @addBlankNote="addBlankNote" />
			<div class="notes" v-if="notes?.length">
				<Note
					v-for="{
						content,
						backgroundColor,
						id,
						notebookId,
						savedBy,
						userId
					} in data?.getNotes"
					:key="id"
					:content="content"
					:backgroundColor="backgroundColor"
					:id="id"
					:notebook-id="notebookId"
					:saved="savedBy.includes(userId)"
				/>
			</div>
			<div v-else class="no-notes">You currently don't have any notes</div>
		</div>
	</PaddingWrapper>
</template>

<style lang="scss" scoped>
.main > .top {
	&,
	a {
		display: flex;
		align-items: center;
	}
	justify-content: space-between;
}
.notes {
	display: grid;
	margin: 3rem 1rem;
	gap: 1.2rem;
	grid-template-columns: repeat(auto-fit, 280px);
}
.no-notes,
.not-found {
	margin-block: 4rem;
	text-align: center;
	&:not(.not-found) {
		color: #888;
	}
	&:not(.no-notes) {
		font-size: 1.3rem;
	}
}
</style>
