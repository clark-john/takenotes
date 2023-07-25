<script lang="ts" setup>
import {
	GetNotebooksQuery,
	GetNotebooksQueryVariables,
	Note
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
	<div class="main">
		<div class="title">
			<span>Notebooks</span>
			<n-button @click="show = !show" type="primary"> Create </n-button>
		</div>
		<div v-if="data">
			<div class="container" v-if="data.getNotebooks.length">
				<!-- @vue-ignore -->
				<Notebook
					v-for="x of data.getNotebooks.toSorted((a: Note, b: Note) => {
						return a.createdAt < b.createdAt ? 1 : -1;
					})"
					:key="x.id"
					:bg="x.backgroundColor"
					:name="x.name"
					:id="x.id"
				/>
			</div>
			<div v-else class="no-notebooks">You current don't have notebooks</div>
		</div>
		<div v-else-if="fetching">
			<CenteredSpin text="Loading your notebooks" />
		</div>
	</div>
	<CreateNotebookModal :show="show" @close="show = false" />
</template>

<style lang="scss" scoped>
.main {
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
	.container {
		$number: 5;
		display: grid;
		justify-items: center;
		margin-inline: 4rem;
		grid-template-columns: repeat(auto-fit, 200px);
		column-gap: 3rem;
	}
}
.no-notebooks {
	margin-block: 4rem;
	text-align: center;
	color: #888;
}
</style>
