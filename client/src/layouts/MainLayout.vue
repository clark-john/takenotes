<script lang="ts" setup>
/*const { withNavbar } = defineProps<{
	withNavbar: boolean;
}>();*/

document.title = "Service Unavailable";
</script>

<template>
	<!-- <Navbar v-if="withNavbar" /> -->
	<!-- <router-view /> -->
	<div class="container">
		<div class="sad">:(</div>
		<div class="text">Unfortunately, <b>takenotes</b> is unavailable for use due to shutdown of 
			<a href="https://deta.space/sunset" target="_blank">Deta</a>.
		</div> 
	</div>
</template>

<style scoped lang="scss">
.container {
	margin-inline: 20%;
	margin-top: 10%;
	.sad {
		font-size: 6rem;
	}
	.text {
		font-size: 1.25rem;
		font-weight: 300;
	}
}

</style>
