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
  background: #fff;
  border-radius: $l;
  border: 1px solid #ccc;
  color: #222;
  display: inline-flex;
  font-size: $font-xs;
  padding: $xs $m;
  transition: background-color $fast ease-out;
  white-space: nowrap;

  &.purple {
    background-color: var(--purple);
    color: #fff;
    border-color: transparent;
    transition: background-color $fast ease-in;
  }
}

.dark {
  .tag-container {
    background-color: #444;
    border-color: #333;
    color: #aaa;

    &.purple {
      background-color: var(--purple);
      color: #fff;
    }
  }
}
</style>