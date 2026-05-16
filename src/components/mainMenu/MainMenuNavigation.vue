<template>
  <nav>
    <ul class="navigation-list">
      <router-link
        v-for="item in navigationItems"
        :key="item.name"
        v-slot="{ navigate }"
        class="navigation-list-item"
        :to="{ name: item.route }"
        custom
      >
        <li role="link" @click="navigate" @keypress.enter="() => navigate()">
          <div class="navigation-list-item__icon-container">
            <Component
              :is="item.component"
              class="navigation-list-item__icon"
            />
          </div>
          <div class="navigation-list-item__text uppercase letter-spacing">
            {{ item.name }}
          </div>
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import PokeballIcon from "@/assets/home-icons/PokeballIcon.vue";
import PokedexIcon from "@/assets/home-icons/PokedexIcon.vue";
import SettingsIcon from "@/assets/home-icons/SettingsIcon.vue";

interface NavigationItem {
  name: string;
  route: string;
  component: object;
}

const navigationItems: NavigationItem[] = [
  { name: "Types", route: "Types", component: markRaw(PokeballIcon) },
  { name: "Pokédex", route: "Pokedex", component: markRaw(PokedexIcon) },
  { name: "Settings", route: "Settings", component: markRaw(SettingsIcon) },
];
</script>

<style lang="scss" scoped>
nav {
  display: contents;
}

.navigation-list {
  position: fixed;
  bottom: $space-32;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-around;

  @media screen and (min-width: 1024px) {
    justify-content: center;
    gap: $space-64;
  }
}

.navigation-list-item {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: $space-24;
  text-decoration: none;
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
    height: $space-64;
    justify-content: center;
    width: $space-64;
    overflow: hidden;
  }

  &__icon-container:after {
    position: absolute;
    content: "";
    width: 40px;
    height: 100px;
    top: -55px;
    left: -30px;
    transform: rotate(45deg);
    visibility: hidden;
    animation: glare 2000ms cubic-bezier(0.27, 0.79, 0.35, 1.21);
    animation-delay: 1000ms;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &__icon {
    height: $space-32;
    width: $space-32;
    color: var(--color-secondary-fg);
    font-size: $font-32;
  }

  &__text {
    color: var(--color-text);
    font-size: $font-14;
    font-weight: 700;
    margin-top: $space-12;
    text-align: center;
  }
}

.navigation-list-item:nth-child(1),
.navigation-list-item:nth-child(3) {
  margin-top: -$space-64;

  .navigation-list-item__icon-container {
    width: $space-48;
    height: $space-48;
  }

  .navigation-list-item__icon {
    width: $space-24;
    height: $space-24;
    font-size: $font-24;
  }

  .navigation-list-item__text {
    font-size: $font-12;
    margin-top: $space-8;
  }
}
</style>
