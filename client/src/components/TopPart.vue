<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ChevronBack } from '@vicons/ionicons5';

const router = useRouter();

defineProps<{
  text?: string,
}>();
</script>

<template>
  <div class="top">
    <div class="link" @click="() => router.back()">
      <n-icon size="40">
        <ChevronBack />
      </n-icon>
    </div>
    <div class="text">{{ text }}</div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-size: 1.5rem;
  }
  .link {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
