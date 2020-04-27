<template>
  <button
    class="condensed" 
    @click="clicked()"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  methods: {
    clicked () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    background: #fff;
    border: 1px solid transparent;
    padding: $s $m;
    font-size: $font-m;
    font-weight: 700;
    color: #333;
    border-radius: $l;
    cursor: pointer;
    outline: none;

    &[disabled] {
      background: #888;
      color: #555;
    }

    &.ghost {
      background: none;
      border: 1px solid #333;
    }
    &.pagination {
      background: #333;
      color: #fff;
      border-radius: 0;
      
      &.previous {
        clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
        padding-right: $xl;
        border-top-right-radius: $m;
      }
      &.next {
        padding-left: $xl;
        clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
      }
    }
  }
</style>