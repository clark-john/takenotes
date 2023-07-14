<script lang="ts" setup>
/* eslint-disable vue/no-setup-props-destructure */
const { bg, name } = defineProps<{
  bg: string;
  name: string;
}>();
</script>
<template>
  <div :style="{ backgroundColor: bg }" class="nb">{{ name }}</div>
</template>

<style lang="scss" scoped>
$radius: 4px;
.nb {
  width: 200px;
  border-top-right-radius: $radius;
  border-bottom-right-radius: $radius;
}
</style>