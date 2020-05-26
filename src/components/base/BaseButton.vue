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
  background: #fff;
  border-radius: $xs;
  border: 1px solid transparent;
  color: #333;
  cursor: pointer;
  font-size: $font-s;
  font-weight: 700;
  outline: none;
  padding: $xs $s;

  &[disabled] {
    background: #888;
    color: #555;
  }

  &.ghost {
    background: none;
    border: 1px solid #333;
  }
  &.ghost-white {
    background: none;
    border: 1px solid #fff;
    color: #fff;
  }
  &.purple {
    background: $purple;
    color: #fff;
  }
}
</style>