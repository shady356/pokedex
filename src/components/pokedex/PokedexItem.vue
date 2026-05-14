<template>
  <div v-if="pokemon && pokemon.name" class="sprite">
    <img class="sprite__image" :src="sprite" alt="" />
  </div>
  <div v-else class="sprite--empty" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { $getTypeColor, type PokemonTypeName } from "@/helpers/types";
import { getPokemonSpriteByName } from "@/helpers/sprites";
import type { PokemonEntry } from "@/helpers/pokedexFilters";

export default defineComponent({
  name: "PokedexItem",
  props: {
    pokemon: {
      type: Object as PropType<PokemonEntry>,
      required: true,
    },
  },
  computed: {
    sprite(): string {
      return getPokemonSpriteByName(this.pokemon.name);
    },
  },
  methods: {
    typeColor(): string {
      return $getTypeColor(this.pokemon.types[0].type.name as PokemonTypeName);
    },
  },
});
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
