<script lang="ts" setup>
import { useTheme } from '@stores/themeStore';
import { ref } from 'vue';

const store = useTheme();

const { setTheme, theme } = store;

const active = ref<boolean>(theme === 'dark');

function handleUpdate(ev: boolean) {
	setTheme(ev ? 'dark' : 'light');
}
</script>

<template>
  <n-switch
    size="large"
    @update:value="handleUpdate"
    v-model:value="active"
  >
    <template #checked> Dark </template>
    <template #unchecked> Light </template>
  </n-switch>
</template>