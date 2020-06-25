<template>
  <div>
    <div class="home-navigation-container">
      <h1 class="pokemon-logo">
        PokéView
      </h1>
      <MainMenuNavigation 
        :items="navigationItems"
      />
    </div>
  </div>
</template>

<script>
import MainMenuNavigation from '@/components/mainMenu/MainMenuNavigation.vue'
export default {
  name: "Home",
  components: {
    MainMenuNavigation
  },
  data() {
    return {
      navigationItems: [
        {
          name: "Pokédex",
          route: "Pokedex",
          icon: require('../assets/home-icons/pokedex_icon.png')
        },
        {
          name: "Types",
          route: "Types",
          icon: require('../assets/home-icons/types.png')
        },
        {
          name: "About",
          route: "About",
          icon: require('../assets/home-icons/about.png')
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home-navigation-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $l;

  .pokemon-logo {
    color: $blue-dark;
    font-size: 48px;
    font-weight: 100;
    margin-bottom: $xxl;
  }
}
</style>