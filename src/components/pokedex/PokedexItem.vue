<template>
  <div
    v-if="pokemon"
    :style="spriteStyle"
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
        backgroundImage: `url(${getPokemonSpriteByName(this.pokemon.name)})`, 
        backgroundColor: `${this.typeColor()}`
      }
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
  height: 92px;
  width: 92px;
  padding: 10px;
  background-color: #ddd;
  background-position: center;
  background-size: 65%;
  background-repeat: no-repeat;

  @media (min-width: 1024px) {
    width: $xxxxxl;
    height: $xxxxxl;  
  }
}
</style>