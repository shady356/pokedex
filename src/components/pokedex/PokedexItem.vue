<template>
  <div
    v-if="pokemon && pokemon.name"
    class="sprite"
  >
    <img
      class="sprite__image"
      :src="sprite"
      alt=""
    >
  </div>
  <div
    v-else
    class="sprite--empty"
  />
</template>

<script>
import { $getTypeColor } from "@/helpers/types.js";
import {getPokemonSpriteByName} from '@/helpers/sprites.js'
export default {
  name: "PokedexItem",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  computed: {
    spriteStyle () {
      return {
        boxShadow: ` 0 0 3px ${this.typeColor()}`,
      }
    },
    sprite() {
      return getPokemonSpriteByName(this.pokemon.name)
    }
  },
  methods: {
    typeColor () {
      return $getTypeColor(this.pokemon.types[0].type.name)
    },
  }
};
</script>

<style lang="scss" scoped>
.sprite {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $space-12;
  background-color: var(--color-accent-dim);
  width: 100%;
  height: 100%;
  transition: transform 50ms ease-in-out;

  &:active {
    transform: scale(1.05);
  }
  
  &__image {
    width: 75%;
    height: 75%;
  }
  
  &--empty {
    background-color: var(--color-bg-secondary);
  }
}
</style>