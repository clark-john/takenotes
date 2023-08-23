<script lang="ts" setup>
import { useNotebook } from '@stores';
// import { ref } from 'vue';
// import { UseQueryResponse } from '@urql/vue';

const { getPublicNotebooks } = useNotebook();
const { data, fetching } = getPublicNotebooks();
</script>
<template>
	<div>
		<CenteredSpin v-if="fetching" />
		<NotebooksContainer v-else>
			<Notebook v-for="x in data?.getPublicNotebooks" 
				:key="x.id"
				:saved="x.saved"
				:name="x.name"
				:id="x.id"
				:bg="x.backgroundColor || ''"
			/>
		</NotebooksContainer>
	</div>
</template>
