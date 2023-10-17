<script lang="ts" setup>
import { useNotebook } from '@stores';
import { getSubFromToken } from '../utils';
// import { ref } from 'vue';
// import { UseQueryResponse } from '@urql/vue';

const { getPublicNotebooks } = useNotebook();
const { data, fetching } = getPublicNotebooks();

const sub = getSubFromToken();
</script>
<template>
	<div class="main-page">
		<div class="title">
			Shared Notebooks
		</div>
		<CenteredSpin v-if="fetching" />
		<NotebooksContainer v-else class="container">
			<Notebook v-for="x in data?.getPublicNotebooks" 
				:key="x.id"
				:saved="x.savedBy.includes(sub)"
				:name="x.name"
				:id="x.id"
				:bg="x.backgroundColor || ''"
				:user-id="x.userId"
			/>
		</NotebooksContainer>
	</div>
</template>

<style lang="scss" scoped>
.main-page {
	margin-block: 12px;
	.title {
		font-size: 2rem;
		font-weight: 600;
		text-align: center;
	}
	.container {
		margin-block: 1rem;
	}
}
</style>
