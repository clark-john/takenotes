<script lang="ts" setup>
import { GetNotebooksQuery } from '@generated';
import { useNotebook } from '@stores/notebookStore';

const { getNotebooks } = useNotebook();

const { data, fetching } = getNotebooks();

</script>
<template>
	<div class="main">
		<div class="title">Notebooks</div>
		<div v-if="data">
			<div 
				v-for="x of (data as GetNotebooksQuery).getNotebooks" 
				:key="(data as GetNotebooksQuery).getNotebooks.indexOf(x) + 1"
				class="container"
			>
				<Notebook 
					:bg="x.backgroundColor || ''"
					:name="x.name || ''" 
				/>
			</div>
		</div>
		<div v-else-if="fetching">
			<n-spin />
		</div>
	</div>
</template>
<style lang="scss" scoped>
.main {
	margin-top: 10px;
	.title {
		font-size: 2rem;
		font-weight: 600;
		text-align: center;
	}
	.container {
		margin-inline: 2rem;
	}
}
</style>
