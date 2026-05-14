<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      :key="pokemonId"
      class="pokemon-sprite-container"
    >
      <img
        v-if="!offloadSprite"
        id="pokemon-sprite-id"
        :src="pokemonSpriteImg"
        :class="['pokemon-sprite', { zoom: isPokemonZoom }]"
        alt="pokemon sprite"
      >
      <!-- Loading pokemon sprite -->
      <BaseProgressSpinner v-else />
    </div>
  </transition>
</template>

<script>
import {getPokemonSpriteByName} from '@/helpers/sprites.js'
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner";
export default {
  name: 'CardSprite',
  components: {
    BaseProgressSpinner
  },
  props: {
    slideDirection: {
      type: String,
      required: true
    },
    pokemonId: {
      type: [Number, String],
      required: true
    },
    offloadSprite: {
      type: Boolean,
      required: true
    },
    pokemon: {
      type: Object,
      requiered: true,
      default: () => {}
    },
    isPokemonZoom: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pokemonSpriteImg() {
      return getPokemonSpriteByName(this.pokemon.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.pokemon-sprite-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: calc(100% - #{$space-48});
  max-height: calc(100% - #{$space-48});
  padding: $space-24 0;
  box-sizing: border-box;

  .pokemon-sprite {
    position: relative;
    bottom: 10%;
    max-height: 100%;
    max-width: 100%;
    transform: translateX(0%);
    transition: height .4s ease-out, top .4s ease-out;
    z-index: 10;

    &.zoom {
      top: 100%;
      height: 100% !important;
      max-height: 100% !important;
      transition: height .4s ease-in, top .4s ease-in;
    }

    @media (min-width: 1024px) {
      height: 192px;
    }
  }
}
</style>