<template>
  <div>
    <div class="home-navigation-container">
      <h1 class="pokemon-logo">
        Pokédex
      </h1>
      <ul class="navigations">
        <router-link
          class="item"
          v-for="item in navigations"
          :key="item.name"
          :to="{ name: item.route }"
          tag="li"
        >
          {{ item.name }}
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
        {
          name: "Types",
          route: "About"
        },
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
    color: #fff;
    text-shadow: 0 2px 10px #6ae;
    margin-bottom: $l;
  }

  .navigations {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 80%;

    .item {
      background: hsla(0, 0%, 100%, 0.5);
      border-bottom: 2px solid #6ae;
      border-radius: $l;
      border-top: 1px solid #c7efff;
      box-shadow: 0 -30px 50px #52c3e6 inset, 0 6px 10px #66cceeaa;
      color: #3c7c99;
      font-size: $font-xl;
      font-weight: 700;
      margin-bottom: $l;
      padding: $s 0;
      text-align: center;
      transition: all 0.4s;
      width: 100%;
    }
  }
}
</style>