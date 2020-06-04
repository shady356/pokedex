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
          name: "Pokedex",
          route: "Pokedex"
        },
/*         {
          name: "Types",
          route: "About"
        }, */
        {
          name: "About",
          route: "About"
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
    color: #79a;
    margin-bottom: $l;
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
      background-color: hsla(193, 58%, 87%, 0.5);
      background-image: url('../assets/icons/pokeball_white.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50%;
      border-bottom: 4px solid #6ae;
      border-radius: $s;
      border-top: 1px solid #c7efff;
      box-shadow: 0 -30px 50px #52c3e6 inset, 0 6px 10px #66cceeaa;
      height: 12vh;
      margin: $m;
      justify-content: center;
      align-items: flex-end;
      padding: $xs;
      transition: all 0.4s;
      width: 50%;

      .text {
        color: #3c7c99;
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