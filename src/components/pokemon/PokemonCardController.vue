<template>
  <div>
    <!-- Pokemon -->
    <BaseModal is-pokemon-card @closeModal="closePokemonCardController()">
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

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";

export default defineComponent({
  name: "PokemonCardController",
  components: { BaseModal, PokemonCard },
  props: {
    pokemonId: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    pokemonIndex: {
      type: Number,
      default: 0,
    },
    pokedexIds: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },
  computed: {
    isFirstPokemon(): boolean {
      return this.pokemonIndex === 0;
    },
    isLastPokemon(): boolean {
      return this.pokemonIndex === this.pokedexIds.length - 1;
    },
  },
  methods: {
    closePokemonCardController() {
      this.$router.push({ name: "Pokedex" });
    },
    paginatePokemon(direction: string) {
      if (direction === "next") {
        this.paginateNextPokemon();
      } else {
        this.paginatePreviousPokemon();
      }
    },
    paginatePreviousPokemon() {
      if (!this.isFirstPokemon) {
        this.$router.push({
          name: "PokemonCardController",
          params: {
            pokemonId: this.getPokemonPaginationId(
              this.pokemonIndex,
              "previous",
            ),
          },
          query: { i: this.pokemonIndex - 1 },
        });
      }
    },
    paginateNextPokemon() {
      if (!this.isLastPokemon) {
        this.$router.push({
          name: "PokemonCardController",
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, "next"),
          },
          query: { i: this.pokemonIndex + 1 },
        });
      }
    },
    getPokemonPaginationId(index: number, direction: string): number {
      return direction === "previous"
        ? this.pokedexIds[index - 1]
        : this.pokedexIds[index + 1];
    },
  },
});
</script>
