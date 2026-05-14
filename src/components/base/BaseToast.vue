<template>
  <div 
    v-if="visible" 
    class="toast-container"
  >
    Foobar
  </div>
</template>

<script>
export default {
  name: 'BaseToast',
  data() {
    return {
      visible: false
    }
  },
  created() {
    this.visible = true
    setTimeout(() =>
      this.visible = false,
      3000
    )
  }
}
</script>

<style lang="scss" scoped>
  .toast-container {
    background: var(--color-bg-tertiary);
    box-sizing: border-box;
    color: var(--color-text);
    padding: $space-16 $space-32;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10000;
  }
</style>