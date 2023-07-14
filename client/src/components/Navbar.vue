<script lang="ts" setup>
import { useQuery } from "@urql/vue";
import { MeDoc //, MeQuery 
} from '@generated';

const { data, fetching } = useQuery({ query: MeDoc });
</script>

<template>
	<nav>
		<div class="title">
			<img src="/favicon.svg" alt="" height="30">
			TakeNotes
		</div>
		<div v-if="data">
			{{ data?.me?.firstName }}
		</div>
		<div v-else-if="fetching">
			Loading user...
		</div>
	</nav>
</template>
<style lang="scss" scoped>
@use "../colors" as *;

nav {
	.title {
		font-weight: 600;
		display: flex;
		column-gap: 10px;
		align-items: center;
		font-size: 1.3rem;
	}
	display: flex;
	align-items: center;
	padding: 10px 20px;
	justify-content: space-between;
	background-color: darken($dark-bg-color, 2%);
}
</style>
