<script lang="ts" setup>
import {
	GetNotebooksQuery,
	GetNotebooksQueryVariables
	// Note
} from '@generated';
import { useNotebook } from '@stores/notebookStore';
import { ref } from 'vue';
import { UseQueryResponse } from '@urql/vue';

const { getNotebooks } = useNotebook();

const { data, fetching } = getNotebooks() as UseQueryResponse<
	GetNotebooksQuery,
	GetNotebooksQueryVariables
>;

const show = ref(false);
</script>

<template>
	<div class="main-page">
		<div class="title">
			<span>Notebooks</span>
			<n-button @click="show = !show" type="primary"> Create </n-button>
		</div>
		<div v-if="data">
			<NotebooksContainer class="container" v-if="data.getNotebooks.length">
				<!-- <Notebook
					v-for="x of (() => {
						data.getNotebooks.sort((a: Note, b: Note) => 
							a.createdAt < b.createdAt ? 1 : -1);
						return data.getNotebooks;
					})()"
					:key="x.id"
					:name="x.name"
					:bg="x.backgroundColor ?? ''"
					:id="x.id"
					:saved="x.savedBy.includes(x.userId)"
					:user-id="x.userId"
				/>
 -->
			</NotebooksContainer>
			<div v-else class="no-notebooks">
				You currently don't have any notebooks
			</div>
		</div>
		<div v-else-if="fetching">
			<CenteredSpin text="Loading your notebooks" />
		</div>
	</div>
	<CreateNotebookModal :show="show" @close="show = false" />
</template>

<style lang="scss" scoped>
.main-page {
	margin-block: 12px;
	.title {
		display: grid;
		font-size: 2rem;
		font-weight: 600;
		position: relative;
		grid-template-columns: 100% 0%;
		justify-items: center;
		align-items: center;
		button {
			justify-self: end;
			margin-right: 1.5rem;
		}
	}
	.spin,
	.container {
		margin-block: 1rem;
	}
}
.no-notebooks {
	margin-block: 4rem;
	text-align: center;
	color: #888;
}
</style>
