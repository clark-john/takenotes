<script lang="ts" setup>
import { GetNotebooksQuery } from '@generated';
import { useNotebook } from '@stores/notebookStore';
import { ref } from 'vue';
// import { useSessionErrorDialog } from '../composables';

const { getNotebooks } = useNotebook();

const { data, fetching } = getNotebooks();
// alert(document.body.clientWidth)
const show = ref(false);

// useSessionErrorDialog(error, router => {
// 	router.push("/login");
// })
</script>
<template>
	<div class="main">
		<div class="title">
			<span>Notebooks</span>
			<n-button @click="show = !show" type="primary"> Create </n-button>
		</div>
		<div v-if="data">
			<div class="container">
				<Notebook
					v-for="x of (data as GetNotebooksQuery).getNotebooks"
					:key="(data as GetNotebooksQuery).getNotebooks.indexOf(x) + 1"
					:bg="x.backgroundColor || ''"
					:name="x.name || ''"
					:id="x.id || ''"
				/>
			</div>
		</div>
		<div v-else-if="fetching">
			<n-spin class="spin" />
		</div>
	</div>
	<CreateNotebookModal :show="show" @close="show = false" />
</template>
<style lang="scss" scoped>
@function templateCols($number) {
	@return repeat($number, calc(100% / $number));
}

.main {
	margin-top: 10px;
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
</style>
