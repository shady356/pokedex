<template>
  <div class="tooltip-container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tooltip-container {
  position: absolute;
  background: var(--color-black);
  color: var(--color-white);
  font-size: $font-12;
  padding: 10px;
  text-align: left;
}
</style>
