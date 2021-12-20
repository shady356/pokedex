<template>
  <ul class="navigation-list">
    <router-link
      class="navigation-list__item"
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.route }"
      tag="li"
    >
      <div class="item__icon">
        <Component
          :is="item.component"
          class="icon__image"
        />
      </div>
      <div class="item__text uppercase letter-spacing">
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
  props: {
    items: {
      type: Array,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
  .navigation-list {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    @media screen and (min-width: 1024px) {
      width: 50%;
    }

    .navigation-list__item {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: $l;
      transition: all 0.4s;
      width: calc(100% / 3);

      .item__icon {
        align-items: center;
        background: var(--main-color-light);
        border: 2px solid var(--main-color-dark);
        border-radius: 50%;
        display: flex;
        height: $xxxl;
        justify-content: center;
        width: $xxxl;

        .icon__image {
          height: $xl;
          width: $xl;
        }
      }
      .item__text {
        color: var(--main-color-black);
        font-size: $font-s;
        font-weight: 700;
        margin-top: $s;
        text-align: center;
      }
    }
  }
</style>