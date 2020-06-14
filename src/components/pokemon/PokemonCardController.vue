<template>
  <div>
    <transition
      :name="slideDirection"
      mode="out-in"
    >
      <!-- Pokemon -->
      <BaseModal
        is-pokemon-card
        :key="pokemonId"
        @closeModal="closePokemonCardController()"
      >
        <Pokemon
          :pokemon-id="pokemonId"
          :pokemon-index="pokemonIndex"
          @paginate-pokemon="paginatePokemon"          
        />
      </BaseModal>
    </transition>
  </div>
</template>

<script>
import BaseModal from "@/components/base/BaseModal.vue";
import Pokemon from "@/components/pokemon/Pokemon.vue";
export default {
  name: 'PokemonCardController',
  components: {
    BaseModal,
    Pokemon
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
  data() {
    return {
      slideDirection: ""
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
        this.slideDirection = "slide-h-l";
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
        this.slideDirection = "slide-h-r";
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