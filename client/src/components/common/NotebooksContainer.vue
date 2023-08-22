<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  justify-items: center;
  margin-inline: 4rem;
  grid-template-columns: repeat(auto-fit, 200px);
  column-gap: 3rem;
  row-gap: 1rem;
}
</style>
