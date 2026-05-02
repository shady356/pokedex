<template>
  <div
    class="tag-container uppercase letter-spacing"
    @click="clicked()"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseTag",
  methods: {
    clicked() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-container {
  align-items: center;
  background: var(--color-bg-primary);
  border-radius: $l;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  display: inline-flex;
  font-size: $font-xs;
  padding: $xs $m;
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