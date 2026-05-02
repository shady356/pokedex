<template>
  <button
    class="base-button-icon"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButtonIcon",
};
</script>

<style lang="scss" scoped>
.base-button-icon {
  align-items: center;
  background: var(--color-bg-secondary);
  border-radius: 50%;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  height: $xxl;
  justify-content: center;
  outline: none;
  width: $xxl;
  transition: transform 50ms ease-in-out;

  &:hover {
    background: var(--color-bg-tertiary);
  }

  &:active {
    background: var(--color-bg-secondary);
    transform: scale(1.05);
  }
}
</style>
