<template>
  <button class="base-button-icon" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{ click: [] }>();
</script>

<style lang="scss" scoped>
.base-button-icon {
  align-items: center;
  background: var(--color-accent-dim);
  border-radius: 50%;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  height: $space-48;
  justify-content: center;
  outline: none;
  width: $space-48;
  transition: transform 50ms ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: var(--color-accent);
  }

  &:active {
    background: var(--color-accent-dim);
    transform: scale(1.05);
  }
}
</style>
