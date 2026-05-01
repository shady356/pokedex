<template>
  <button @click="clicked()">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  methods: {
    clicked() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>

button {
  background: var(--color-bg-primary);
  border-radius: $xs;
  border: 1px solid transparent;
  color: var(--color-text);
  cursor: pointer;
  font-size: $font-s;
  font-weight: 700;
  outline: none;
  padding: $xs $s;

  &[disabled] {
    background: var(--color-bg-disabled);
    color: var(--color-text-light);
  }

  &.ghost {
    background: none;
    border: 1px solid var(--color-black);
  }
  &.ghost-white {
    background: none;
    border: 1px solid var(--color-white);
    color: var(--color-white);
  }
  &.primary {
    background: var(--color-primary);
    color: var(--color-primary-fg);
  }
}
</style>