<template>
  <div class="container">
    <div class="title condensed">the Pokédex</div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="scss" scoped>
  .container {
    position: fixed;
    background: #fff;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .title {
      font-weight: 700;
      color: #666;
      font-size: $font-xl;
    }
  }
</style>