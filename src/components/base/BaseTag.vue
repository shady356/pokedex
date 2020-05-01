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
  name: 'BaseTag',
  methods: {
    clicked () {
      this.$emit('click')
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .tag-container {
    display: inline-flex;
    align-items: center;
    color: #222;
    font-size: $font-s;
    background: #fff;
    border: 1px solid #ccc;
    padding: $xxs $s;
    border-radius: $l;
    transition: background-color $fast ease-out;

    &.purple {
      background: $purple;
      color: #fff;
      border-color: transparent;
      transition: background-color $fast ease-in;
    }
  }
</style>