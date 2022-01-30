<template>
  <ul class="navigation-list">
    <router-link
      class="navigation-list-item"
      v-for="item in navigationItems"
      :key="item.name"
      :to="{ name: item.route }"
      tag="li"
    >
      <div class="navigation-list-item__icon-container">
        <Component
          :is="item.component"
          class="navigation-list-item__icon"
        />
      </div>
      <div class="navigation-list-item__text uppercase letter-spacing">
        {{ item.name }}
      </div>
    </router-link>
  </ul>
</template>

<script>
import AboutIcon from '@/assets/home-icons/AboutIcon.vue'
import PokeballIcon from '@/assets/home-icons/PokeballIcon.vue'
import PokedexIcon from '@/assets/home-icons/PokedexIcon.vue'
export default {
  name: 'MainMenuItems',
  components: {
    AboutIcon,
    PokeballIcon,
    PokedexIcon
  },
  data() {
    return {
      navigationItems: [
        {
          name: "Types",
          route: "Types",
          component: "PokeballIcon",
        },
        {
          name: "Pokédex",
          route: "Pokedex",
          component: "PokedexIcon",
        },
        {
          name: "About",
          route: "About",
          component: "AboutIcon",
        }
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
.navigation-list {
  position: fixed;
  bottom: $xl;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-around;

  @media screen and (min-width: 1024px) {
    justify-content: center;
    gap: $xxxl;
  } 
}
.navigation-list-item {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: $l;
  transition: all 0.4s;

  &__icon-container {
    position: relative;
    align-items: center;
    background: var(--main-color-light);
    border: 2px solid var(--main-color-dark);
    border-radius: 50%;
    display: flex;
    height: $xxxl;
    justify-content: center;
    width: $xxxl;
    overflow: hidden;
  }
  &__icon-container:after {
    position: absolute;
    content: '';
    width: 40px;
    height: 100px;
    top: -55px;
    left: -30px;
    transform: rotate(45deg);
    visibility: hidden;
    animation: glare 2000ms cubic-bezier(0.270, 0.790, 0.350, 1.210);
    animation-delay: 1000ms;
    background: linear-gradient(
      to right, 
      rgba(255, 255, 255, 0.0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.0) 100%
    );
    //background: #333;
  }
  &__icon {
    height: $xl;
    width: $xl;
  }
  &__text {
    color: var(--main-color-black);
    font-size: $font-s;
    font-weight: 700;
    margin-top: $s;
    text-align: center;
  }
}
.navigation-list-item:nth-child(1),
.navigation-list-item:nth-child(3) {
  margin-top: -$xxxl;

  .navigation-list-item__icon-container{
    width: $xxl;
    height: $xxl;
  }
  .navigation-list-item__icon {
    width: $l;
    height: $l;
  }
  .navigation-list-item__text {
    font-size: $font-xs;
    margin-top: $xs;
  }
}
@keyframes glare {
  0% {
    top: -55px;
    left: -30px;
    visibility: visible;
  }
  100% {
    top: 100%;
    left: 100%;
    visibility: hidden;
  }
}
</style>