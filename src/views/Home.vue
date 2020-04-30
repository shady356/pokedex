<template>
  <div>
    <div class="home-navigation-container">
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
      navigations: [
        {
          name: 'Pokedex',
          route: 'Pokedex',
        },
        {
          name: 'Types',
          route: 'Pokedex',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-navigation-container {
    padding: $l;

    .navigations {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .item {
        text-align: center;
        background: hsla(0, 0%, 100%, .5);
        height: $xxxxxl;
        width: $xxxxxl;
        line-height: $xxxxxl;
        border-radius: 50%;
        box-shadow: 0 -20px 50px rgb(144, 221, 204) inset;
        color: #286;
        font-size: $font-xl;
        font-weight: 700;
        transition: all .4s;

        &:hover {
          box-shadow: 0 10px 40px rgb(130, 204, 188) inset;
          font-size: $font-l;
          transition: all .4s;
        }
      }
    }
  }
</style>