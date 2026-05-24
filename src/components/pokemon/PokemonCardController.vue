<template>
  <div>
    <!-- Pokemon -->
    <BaseModal is-pokemon-card @close-modal="closePokemonCardController()">
      <PokemonCard
        :pokemon-id="pokemonId"
        :is-first-pokemon="isFirstPokemon"
        :is-last-pokemon="isLastPokemon"
        @paginate-pokemon="paginatePokemon"
      />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseModal from "@/components/base/BaseModal.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";

const props = withDefaults(
  defineProps<{
    pokemonId: number;
    pokedexIds?: number[];
  }>(),
  { pokedexIds: () => [] },
);

const router = useRouter();

const pokemonIndex = computed(() => props.pokedexIds.indexOf(props.pokemonId));
const isFirstPokemon = computed(() => pokemonIndex.value === 0);
const isLastPokemon = computed(
  () => pokemonIndex.value === props.pokedexIds.length - 1,
);

function closePokemonCardController() {
  router.push({ name: "Pokedex" });
}

function paginatePokemon(direction: string) {
  if (direction === "next") paginateNextPokemon();
  else paginatePreviousPokemon();
}

function paginatePreviousPokemon() {
  if (!isFirstPokemon.value) {
    router.push({
      name: "PokemonCardController",
      params: {
        pokemonId: getPokemonPaginationId(pokemonIndex.value, "previous"),
      },
    });
  }
}

function paginateNextPokemon() {
  if (!isLastPokemon.value) {
    router.push({
      name: "PokemonCardController",
      params: {
        pokemonId: getPokemonPaginationId(pokemonIndex.value, "next"),
      },
    });
  }
}

function getPokemonPaginationId(index: number, direction: string): number {
  return direction === "previous"
    ? props.pokedexIds![index - 1]
    : props.pokedexIds![index + 1];
}
</script>
