<script lang="ts" setup>
/* eslint-disable vue/no-setup-props-destructure */
const { withNavbar } = defineProps<{
	withNavbar: boolean;
}>()
</script>

<template>
	<Navbar v-if="withNavbar" />
	<router-view />
</template>
