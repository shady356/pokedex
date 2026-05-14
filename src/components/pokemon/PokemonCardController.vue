<template>
  <div>
    <!-- Pokemon -->
    <BaseModal is-pokemon-card @close-modal="closePokemonCardController()">
      <PokemonCard
        :pokemon-id="pokemonId"
        :pokemon-index="pokemonIndex"
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
    pokemonId: number | string;
    pokemonIndex?: number;
    pokedexIds?: number[];
  }>(),
  { pokemonIndex: 0, pokedexIds: () => [] },
);

const router = useRouter();

const isFirstPokemon = computed(() => props.pokemonIndex === 0);
const isLastPokemon = computed(
  () => props.pokemonIndex === props.pokedexIds.length - 1,
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
        pokemonId: getPokemonPaginationId(props.pokemonIndex!, "previous"),
      },
      query: { i: props.pokemonIndex! - 1 },
    });
  }
}

function paginateNextPokemon() {
  if (!isLastPokemon.value) {
    router.push({
      name: "PokemonCardController",
      params: {
        pokemonId: getPokemonPaginationId(props.pokemonIndex!, "next"),
      },
      query: { i: props.pokemonIndex! + 1 },
    });
  }
}

function getPokemonPaginationId(index: number, direction: string): number {
  return direction === "previous"
    ? props.pokedexIds![index - 1]
    : props.pokedexIds![index + 1];
}
</script>
