<template>
  <button class="tag-container uppercase letter-spacing" @click="clicked()">
    <slot />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{ click: [] }>();

function clicked() {
  emit("click");
}
</script>

<style lang="scss" scoped>
.tag-container {
  align-items: center;
  background: var(--color-bg-primary);
  border-radius: $space-24;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  display: inline-flex;
  font-size: $font-xs;
  padding: $space-8 $space-16;
  transition: background-color $fast ease-out;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;

  &.primary {
    background-color: var(--color-primary);
    color: var(--color-primary-fg);
    border-color: transparent;
    transition: background-color $fast ease-in;
  }
}
</style>
