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
          <div class="text">
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
/*         {
          name: "Types",
          route: "About"
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
    color: #2d4b68;
    margin-bottom: $xxl;
    font-weight: 100;
    font-size: 48px;
    text-shadow: 0px 4px 10px #81a1be;
  }

  .navigations {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    @media screen and (min-width: 1024px) {
      width: 50%;
    }

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: $m;
      transition: all 0.4s;
      cursor: pointer;

      .icon-container {
        width: 8vh;
        height: 8vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #51989b;
        box-shadow: 0 -30px 50px hsl(160, 59%, 51%) inset, 0 6px 20px $blue;

        .icon-image {
          width: 50%;
          height: 50%;
        }
      }

      .text {
        margin-top: $s;
        color: $blue-dark;
        left: $l;
        bottom: 10px;
        font-size: $font-xl;
        font-weight: 700;
        text-align: center;
      }
    }
  }
}
</style>