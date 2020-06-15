<template>
  <div>
    <!-- Pokemon -->
    <BaseModal
      is-pokemon-card
      @closeModal="closePokemonCardController()"
    >
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

<script>
import BaseModal from "@/components/base/BaseModal.vue";
import PokemonCard from "@/components/pokemon/PokemonCard.vue";
export default {
  name: 'PokemonCardController',
  components: {
    BaseModal,
    PokemonCard
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    },
    pokemonIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    pokedexIds() {
      return this.$store.state.pokedexIds;
    },
    isFirstPokemon() {
      return this.pokemonIndex === 0;
    },
    isLastPokemon() {
      return this.pokemonIndex === this.pokedexIds.length - 1;
    }
  },
  methods: {
    closePokemonCardController() {
      this.$router.push({
        name: "Pokedex"
      });
    },
    paginatePokemon (direction) {
      if(direction === 'next') {
        this.paginateNextPokemon ()
      } else {
        this.paginatePreviousPokemon ()
      }
    },
    paginatePreviousPokemon () {
      if(!this.isFirstPokemon) {
        this.$router.push({
          name: "PokemonCardController",
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, "previous"),
            pokemonIndex: this.pokemonIndex - 1
          }
        });
      }
    },
    paginateNextPokemon () {
      if(!this.isLastPokemon) {
        this.$router.push({
          name: "PokemonCardController",
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, "next"),
            pokemonIndex: this.pokemonIndex + 1
          }
        });
      }
    },
    getPokemonPaginationId(index, direction) {
      if (direction === "previous") {
        return this.pokedexIds[index - 1];
      } else {
        return this.pokedexIds[index + 1];
      }
    },
  }
}
</script>