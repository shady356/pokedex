<template>
  <div>
    <Header 
      @filter="openFilter()"
      @search="openSearch()" 
    />
    <div 
      class="default-page-margin" 
      v-if="loadedCounter > 0"
    >
      <ul>
        <router-link 
          v-for="(n,index) in batchEndPosition" 
          :key="index" 
          tag="li"
          :to="{ 
            name: 'Pokemon',
            params: { 
              pokemonId: pokemonList[index].id,
              pokemonIndex: index
            }
          }"
        >
          <PokedexItem
            :id="pokemonList[index].id"
            :name="pokemonList[index].name"
            :sprite="pokemonList[index].sprite"
          />
        </router-link>
      </ul>
    </div>
    <div
      v-else 
      class="loading"
    >
      <img 
        class="loading-icon" 
        src="@/assets/icons/pokeball_white.png" 
        alt="loading icon"
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
      :showCloseButton="false"
    >
      <FilterPokemon 
        @applyFilters="updateFilters"
      />
    </BaseModal>

    <!-- Pokemon -->
    <BaseModal 
      v-if="isPokemonModal"
      :borderRadius="false"
      @closeModal="closePokemon()"
    >
      <router-view />
    </BaseModal>
  </div>
</template>

<script>
import axios from "axios"
import Header from "@/components/layout/Header.vue"
import BaseModal from "@/components/base/BaseModal.vue"
import FilterPokemon from "@/components/FilterPokemon.vue"
import { $filterData } from "@/helpers/pokedexFilters.js"
import { mapActions} from 'vuex'
import PokedexItem from '@/components/pokedex/PokedexItem'

export default {
  name: "Pokedex",
  components: {
    Header,
    BaseModal,
    FilterPokemon,
    PokedexItem
  },
  data() {
    return {
      pokemonList: [],

      // Filter and search:
      isFilterOpen: false,
      isSearchOpen: false,

      //Batch data:
      currentBatch: 1,
      maxPerBatch: 32,
      loadedCounter: 0,
      showLoader: false,

      isPokemonModal: false,

      scrollPosition: 0,

      filters: {
        generations: [],
        types: []
      }
    }
  },
  computed: {
    BASE_URL() {
      return process.env.VUE_APP_ROOT_URL
    },
    batchEndPosition() {
      const endPosition = this.maxPerBatch * this.currentBatch
      if (endPosition <= this.totalResults) {
        return endPosition
      } else {
        let remainer = this.totalResults - endPosition
        return this.batchStartPosition + this.maxPerBatch + remainer
      }
    },
    batchStartPosition() {
      return this.maxPerBatch * this.currentBatch - this.maxPerBatch
    },
    totalResults() {
      return this.pokemonList.length
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newVal, oldVal) {
        if(oldVal) {
          if(oldVal.name === 'Pokedex') {
            this.scrollPosition = window.scrollY
          }
        }
        this.isPokemonModal = (newVal) ? newVal.meta.showModal : false
      }
    }
  },
  mounted() {
    this.setPokedexMap(this.filters);
  },
  methods: {
    ...mapActions([
      'commitPokedexIds'
    ]),
    getPokemon(pokemonId, arrayIndex) {
      axios
        .get(`${this.BASE_URL}/pokemon-form/${pokemonId}/`)
        .then(response => {
          this.refineResponseData(response.data, arrayIndex)
          this.loadedCounter++
        })
        .catch(error => {
          console.log(error)
        })
    },
    refineResponseData(data, arrayIndex) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default
      }
      this.pokemonList[arrayIndex] = pokemonData
    },
    closePokemon() {
      this.isPokemonModal = false

      // Reset router view:
      this.$router.push({
        name: "Pokedex"
      })

      let scrollY = this.scrollPosition
      setTimeout(() => {
        window.scroll(0, scrollY)
      }, 10);
    },
    getBatchOfPokemon() {
      for (let i = this.batchStartPosition; i < this.batchEndPosition; i++) {
        this.getPokemon(this.pokemonList[i].id, i)
      }
      this.currentBatch++
    },
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.getBatchOfPokemon()
          }
        });
      });
      observer.observe(this.$refs.trigger)
    },
    openFilter() {
      this.isFilterOpen = true
    },
    closeFilter() {
      this.isFilterOpen = false
    },
    openSearch() {
      this.isSearchOpen = true
    },
    closeSearch() {
      this.isSearchOpen = false
    },
    updateFilters(filters) {
      this.setPokedexMap(filters)
      this.closeFilter()
    },
    setPokedexMap(filters) {
      this.resetPokedexMap()
      this.pokemonList = $filterData(filters)
      this.scrollTrigger()
      const pokedexIds =  this.pokemonList.map(pokemon => {
        return pokemon.id
      });
      this.commitPokedexIds(pokedexIds)
    },
    resetPokedexMap() {
      this.pokemonList = []
      this.loadedCounter = 0
      this.currentBatch = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.trigger {
  position: relative;
}
ul {
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;

  li {
    text-align: center;
    margin: 0 1% $l;
    width: 18%;
    
    cursor: pointer;
  }
}

.loading {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;

  .loading-icon {
    width: 64px;
    height: 64px;
    animation: rotate360 1.5s infinite;
  }
}
</style>