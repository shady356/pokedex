<template>
  <nav>
    <ul class="navigation-list">
      <router-link
        v-for="item in navigationItems"
        :key="item.name"
        class="navigation-list-item"
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
  </nav>
</template>

<script>
import PokeballIcon from '@/assets/home-icons/PokeballIcon.vue'
import PokedexIcon from '@/assets/home-icons/PokedexIcon.vue'
import SettingsIcon from '@/assets/home-icons/SettingsIcon.vue'
export default {
  name: 'MainMenuItems',
  components: {
    PokeballIcon,
    PokedexIcon,
    SettingsIcon
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
          name: "Settings",
          route: "Settings",
          component: "SettingsIcon",
        }
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: contents;
}

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
  transition: transform 50ms ease-in-out;

  &:active {
    transform: scale(1.05);
  }

  &__icon-container {
    position: relative;
    align-items: center;
    background: var(--color-secondary);
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
    background: linear-gradient(to right,
        rgba(255, 255, 255, 0.0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.0) 100%);
  }

  &__icon {
    height: $xl;
    width: $xl;
    color: var(--color-secondary-fg);
    font-size: $xl;
  }
  
  &__text {
    color: var(--color-text);
    font-size: $font-s;
    font-weight: 700;
    margin-top: $s;
    text-align: center;
  }
}

.navigation-list-item:nth-child(1),
.navigation-list-item:nth-child(3) {
  margin-top: -$xxxl;

  .navigation-list-item__icon-container {
    width: $xxl;
    height: $xxl;
  }

  .navigation-list-item__icon {
    width: $l;
    height: $l;
    font-size: $l;
  }

  .navigation-list-item__text {
    font-size: $font-xs;
    margin-top: $xs;
  }
}

</style>