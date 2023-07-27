<script setup lang="ts">
import { useSaved } from '@stores';
import { StyleValue } from 'vue';

const { getSavedNotebooks, getSavedNotes } = useSaved();

const { data, fetching } = getSavedNotebooks();
const { data: notes } = getSavedNotes();

const dontHaveStyle: StyleValue = {
	textAlign: 'center',
	marginBlock: '1rem',
	color: '#999'
};
</script>

<template>
	<div>
		<TopPart text="Saved Notebooks and Notes" />
		<div class="content main" v-if="data">
			<div class="notebooks">
				<div class="header">Notebooks</div>
				<div class="content" v-if="data.getSavedNotebooks.length">
					<Notebook
						v-for="{
							id,
							backgroundColor,
							name,
							saved: s
						} of data.getSavedNotebooks"
						:key="id"
						:bg="backgroundColor ?? ''"
						:id="id"
						:name="name"
						:saved="s"
					/>
				</div>
				<div v-else :style="dontHaveStyle">
					You currently don't have any saved notebooks
				</div>
			</div>
			<div class="notes">
				<div class="header">Notes</div>
				<div class="content" v-if="notes?.getSavedNotes.length">
					<Note
						v-for="x in notes?.getSavedNotes"
						:key="x.id"
						:id="x.id"
						:background-color="x.backgroundColor"
						:content="x.content"
						:notebook-id="x.notebookId"
						:saved="x.saved!"
						class="note"
					/>
				</div>
				<div v-else :style="dontHaveStyle">
					You currently don't have any saved notes
				</div>
			</div>
		</div>
		<div v-else-if="fetching">
			<CenteredSpin />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.content.main {
	padding: 2rem 5rem;
	display: grid;
	gap: 1rem;
}
.item {
	border: 2px #fff solid;
	border-radius: 7px;
	padding: 1rem 2rem;
	display: grid;
	gap: 1rem;
	align-items: center;
	justify-items: center;
}

.header {
	font-size: 1.7rem;
}
.notes,
.notebooks {
	.content {
		padding: 2rem;
		gap: 1rem;
		display: flex;
		flex-wrap: wrap;
		.note {
			width: 280px;
		}
	}
}
</style>
