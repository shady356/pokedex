<template>
  <div>
    <div class="home-navigation-container">
      <img class="pokemon-logo" :src="pokemonLogo" alt="pokemon logo">
      <ul class="navigations">
        <router-link
          class="item"
          v-for="item in navigations"
          :key="item.name"
          :to="{ name: item.route}"
          tag="li"
        >
          {{item.name}}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      pokemonLogo: require('@/assets/icons/pokemon-logo.png'),
      navigations: [
        {
          name: 'Pokedex',
          route: 'Pokedex'
        },
        {
          name: 'Types',
          route: 'About'
        },
        {
          name: 'About',
          route: 'About'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-navigation-container {
    padding: $l;

    .pokemon-logo {
      width: 100%;
    }

    .navigations {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      .item {
        text-align: center;
        background: hsla(0, 0%, 100%, .5);
        width: 100%;
        padding: $l 0;
        border-radius: $l;
        box-shadow: 0 -30px 50px rgb(82, 195, 230) inset, 0 6px 10px #66cceeaa;
        border-top: 1px solid #fff;
        border-bottom: 2px solid #6ae;
        color: #26a;
        font-size: $font-xl;
        font-weight: 700;
        margin-bottom: $l;
        transition: all .4s;
      }
    }
  }
</style>