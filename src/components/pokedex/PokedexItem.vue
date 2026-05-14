<template>
  <div v-if="pokemon && pokemon.name" class="sprite">
    <img class="sprite__image" :src="sprite" alt="" />
  </div>
  <div v-else class="sprite--empty" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getPokemonSpriteByName } from "@/helpers/sprites";
import type { PokemonEntry } from "@/helpers/pokedexFilters";

const props = defineProps<{ pokemon: PokemonEntry }>();

const sprite = computed(() => getPokemonSpriteByName(props.pokemon.name));
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
