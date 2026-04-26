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
            :pokemon="pokemonList[index]"
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
      drag-handler
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
import { useQueryClient, STALE } from '@/composables/usePokeApi.js'
import { fetchPokemonForm } from '@/service/pokeApi.js'

export default {
  name: "Pokedex",
  setup() {
    return { queryClient: useQueryClient() }
  },
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
      isPokemonModal: false,

      scrollPosition: 0,

      filters: {
        generations: [],
        types: []
      },
      isFilter: false,
      isLoadingBatch: false
    };
  },
  computed: {
    batchEndPosition() {
      const endPosition = this.maxPerBatch * this.currentBatch;
      return endPosition <= this.totalResults ? endPosition : this.totalResults;
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
  beforeDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  },
  methods: {
    ...mapActions(["commitPokedexIds"]),
    
    // Api
    async getPokemonForm (id, arrayIndex) {
      const data = await this.queryClient.fetchQuery({
        queryKey: ['pokemon-form', id],
        queryFn: () => fetchPokemonForm(id),
        staleTime: STALE,
      })
      this.refineResponseData(data, arrayIndex)
      this.loadedCounter++
    },
    refineResponseData(data, arrayIndex) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        types: data.types,
      };
      this.pokemonList[arrayIndex] = pokemonData;
    },
    async getBatchOfPokemon() {
      if (this.isLoadingBatch) return;

      const start = this.batchStartPosition;
      const end = this.batchEndPosition;

      if (start >= this.totalResults) return;

      this.isLoadingBatch = true;
      this.currentBatch++;

      await Promise.all(
        Array.from({ length: end - start }, (_, i) =>
          this.getPokemonForm(this.pokemonList[start + i].id, start + i)
        )
      );

      this.isLoadingBatch = false;

      await this.$nextTick();
      const rect = this.$refs.trigger?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight) {
        this.getBatchOfPokemon();
      }
    },
    scrollTrigger() {
      if (this._observer) {
        this._observer.disconnect();
      }
      this._observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.getBatchOfPokemon();
        }
      });
      this.$nextTick(() => {
        if (this.$refs.trigger) {
          this._observer.observe(this.$refs.trigger);
        }
      });
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $s;
    width: 100%;
    

    li {
      cursor: pointer;
      width: 100px;
      height: 100px;
    }

    @media (min-width: 1024px) {
      width: 70%;
      
      li {
        width: 128px;
        height: 128px;
      }
    }
  }
}

.filter-item {
  &.active {
    color: var(--purple);
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