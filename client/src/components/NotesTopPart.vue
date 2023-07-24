<script lang="ts" setup>
import { GetNotebookInfoQuery } from '@generated';
import { ChevronLeft } from '@vicons/fa';

defineProps<{
  ninfo?: GetNotebookInfoQuery
}>();
const emit = defineEmits<{
  (e: 'addBlankNote'): void;
}>()
</script>

<template>
  <div class="top">
    <router-link to="/">
      <n-icon size="30">
        <ChevronLeft />
      </n-icon>
    </router-link>
    <div class="notebook-name">
      {{ ninfo?.getNotebookInfo?.name }}
    </div>
    <n-button @click="emit('addBlankNote')" :class="ninfo?.getNotebookInfo ? '' : 'hidden'"> Add Note </n-button>
  </div>
</template>

<style lang="scss" scoped>
.top {
  .notebook-name {
		font-size: 1.5rem;
	}
}
.hidden {
  visibility: hidden;
}
</style>
