<template>
  <header class="header">
    <h3>Pokedex</h3>
    <div><img :src="menuIcon" alt="menu-icon"></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menuIcon: require('@/assets/icons/menu-24px.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    //background: hsla(0, 0%, 100%, .2);
    display: flex;
    align-items: center;
    padding: $m;
    color: #fff;
    justify-content: space-between;
  }
</style>