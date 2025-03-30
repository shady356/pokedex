<template>
  <img
    v-if="pokemon"
    :style="spriteStyle"
    class="sprite"
    :src="sprite"
    alt=""
  >
  <div
    v-else
    class="sprite"
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
        backgroundColor: `${this.typeColor()}`
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
  border-radius: $s;
  background-color: #ddd;
  width: 100%;
  height: 100%;
}
</style>