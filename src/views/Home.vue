<template>
  <div>
    <div class="home-navigation-container">
      <h2 class="pokemon-logo">
        PokéView
      </h2>
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
    text-shadow: 0 0 10px $green;
    color: #fff;
    font-weight: 100;
    font-size: 48px;
    margin-bottom: $xxl;
    font-family: 'Boogaloo', cursive;
  }
}
</style>