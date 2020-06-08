<template>
  <div>
    <div class="home-navigation-container">
      <h1 class="pokemon-logo">
        PokéView
      </h1>
      <ul class="navigations">
        <router-link
          class="item"
          v-for="item in navigations"
          :key="item.name"
          :to="{ name: item.route }"
          tag="li"
        >
          <div class="icon-container">
            <img 
              class="icon-image"
              :src="item.icon" 
              alt="item icon"
            >
          </div>
          <div class="text uppercase letter-spacing">
            {{ item.name }}
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      navigations: [
        {
          name: "Pokédex",
          route: "Pokedex",
          icon: require('../assets/home-icons/pokedex_icon.png')
        },
        /* {
          name: "Types",
          route: "About",
          icon: require('../assets/home-icons/types.png')
        }, */
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

  .navigations {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;

    @media screen and (min-width: 1024px) {
      width: 50%;
    }

    .item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: $m;
      transition: all 0.4s;

      .icon-container {
        align-items: center;
        background: $blue-light;
        border-radius: 50%;
        display: flex;
        height: $xxxl;
        justify-content: center;
        width: $xxxl;

        .icon-image {
          width: $xl;
          height: $xl;
        }
      }

      .text {
        color: $blue-dark;
        font-size: $font-s;
        font-weight: 700;
        margin-top: $s;
        text-align: center;
      }
    }
  }
}
</style>