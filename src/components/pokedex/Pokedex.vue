<template>
  <div>
    <Header>
      <template #title>
        <h1>Pokédex</h1>
      </template>
      
      <template #options>
        <fa-icon
          :class="['filter-item ',{ 'active': isFilter }]"
          icon="filter"
          @click="openFilter"
        />
      </template> 
    </Header>
    <div
      class="default-page-margin pokedex-container"
      v-if="loadedCounter > 0"
    >
      <ul>
        <router-link
          v-for="(n, index) in batchEndPosition"
          :key="index"
          tag="li"
          :to="{
            name: 'PokemonCardController',
            params: {
              pokemonId: pokemonList[index].id,
              pokemonIndex: index
            }
          }"
        >
          <PokedexItem
            :id="pokemonList[index].id"
            :name="pokemonList[index].name"
            :sprite="getSprite(pokemonList[index].name)"
          />
        </router-link>
      </ul>
    </div>
    <div
      v-else
      class="loading"
    >
      <BaseProgressSpinner
        size="large"
      />
    </div>
    <div
      class="trigger"
      ref="trigger"
    />

    <!-- Filter -->
    <BaseModal
      v-if="isFilterOpen"
      @closeModal="closeFilter"
      :show-close-button="false"
    >
      <FilterPokemon
        @applyFilters="updateFilters"
        :is-filter="isFilter"
      />
    </BaseModal>

    <div v-if="isPokemonModal">
      <router-view />
    </div>
  </div>
</template>

<script>
import { $filterData } from "@/helpers/pokedexFilters.js";
import { mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";
import FilterPokemon from "@/components/pokedex/FilterPokemon.vue";
import Header from "@/components/layout/Header.vue";
import PokedexItem from "@/components/pokedex/PokedexItem";
import PokeApi from '@/service/pokeApi.js'

export default {
  name: "Pokedex",
  components: {
    Header,
    BaseModal,
    BaseProgressSpinner,
    FilterPokemon,
    PokedexItem
  },
  data() {
    return {
      pokemonList: [],

      // Filter:
      isFilterOpen: false,

      //Batch data:
      currentBatch: 1,
      maxPerBatch: 16,
      loadedCounter: 0,
      showLoader: false,

      isPokemonModal: false,

      scrollPosition: 0,

      filters: {
        generations: [],
        types: []
      },
      isFilter: false
    };
  },
  computed: {
    batchEndPosition() {
      const endPosition = this.maxPerBatch * this.currentBatch;
      if (endPosition <= this.totalResults) {
        return endPosition;
      } else {
        let remainer = this.totalResults - endPosition;
        return this.batchStartPosition + this.maxPerBatch + remainer;
      }
    },
    batchStartPosition() {
      return this.maxPerBatch * this.currentBatch - this.maxPerBatch;
    },
    totalResults() {
      return this.pokemonList.length;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal) {
          if (oldVal.name === "Pokedex") {
            this.scrollPosition = window.scrollY;
          } else {
            let scrollY = this.scrollPosition;
            setTimeout(() => {
              window.scroll(0, scrollY);
            }, 10);
          }
        }
        this.isPokemonModal = newVal ? newVal.meta.showModal : false;
      }
    }
  },
  mounted() {
    this.setPokedexMap(this.filters);
  },
  methods: {
    ...mapActions(["commitPokedexIds"]),
    
    // Api
    async getPokemonForm (id, arrayIndex) {
      const response = await PokeApi.getPokemonFormById(id)
      this.refineResponseData(response.data, arrayIndex);
      this.loadedCounter++;
      
      if (response.error) {
        alert('error') // TODO: replace with toast
      }
    },
    refineResponseData(data, arrayIndex) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default
      };
      this.pokemonList[arrayIndex] = pokemonData;
    },
    getBatchOfPokemon() {
      for (let i = this.batchStartPosition; i < this.batchEndPosition; i++) {
        this.getPokemonForm(this.pokemonList[i].id, i);
      }
      this.currentBatch++;
    },
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.getBatchOfPokemon();
          }
        });
      });
      observer.observe(this.$refs.trigger);
    },
    openFilter() {
      this.isFilterOpen = true;
    },
    closeFilter() {
      this.isFilterOpen = false;
    },
    filterHasData(filters) {
      return Object.keys(filters).some(filter => {
        return filters[filter].length > 0;
      });
    },
    updateFilters(filters) {
      this.isFilter = this.filterHasData(filters);

      this.setBodyColor();
      this.setPokedexMap(filters);
      this.closeFilter();
    },
    setPokedexMap(filters) {
      this.resetPokedexMap();
      this.pokemonList = $filterData(filters);
      this.scrollTrigger();
      const pokedexIds = this.pokemonList.map(pokemon => {
        return pokemon.id;
      });
      this.commitPokedexIds(pokedexIds);
    },
    resetPokedexMap() {
      this.pokemonList = [];
      this.loadedCounter = 0;
      this.currentBatch = 1;
    },
    getSprite(name) {
      return "https://img.pokemondb.net/sprites/home/normal/" + name + ".png";
    },
    setBodyColor() {
      if (this.isFilter) {
        document.body.classList.add("bodyFilter");
      } else {
        document.body.classList.remove("bodyFilter");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

$pokemon-per-row-mobile: 3;
$pokemon-gap-mobile: 2%;

.trigger {
  position: relative;
  height: 20vh;
  width: 100%;
  //background: #00000022;
}

.pokedex-container {
  display: flex;
  justify-content: center;
  
  ul {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;

    li {
      text-align: center;
      padding: $pokemon-gap-mobile;
      width: calc( 100% / #{$pokemon-per-row-mobile} );
      cursor: pointer;
      box-sizing: border-box;
    }

    @media (min-width: 1024px) {
      width: 50%;
      
      li {
        width: 18%;
      }
    }
  }
}

.filter-item {
  &.active {
    color: $purple;
  }
}

.loading {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>