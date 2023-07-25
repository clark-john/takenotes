<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'close'): void
}>();

defineProps<{
  show: boolean;
}>();
</script>

<template>
  <n-popconfirm 
    :show="show" 
    @positive-click="emit('confirm')" 
    @negative-click="emit('close')" 
    @clickoutside="emit('close')"
  >
    <template #trigger>
      <div class="confirm"></div>
    </template>
    Are you sure?
  </n-popconfirm>
</template>

<style scoped>
.confirm {
  right: 1rem;
  position: absolute;
}
</style>
