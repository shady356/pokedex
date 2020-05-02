<template>
  <div>
    <Header 
      @filter="openFilter()"
      @search="openSearch()"
    />
    <keep-alive
      class="default-page-margin"
      v-if="loadedCounter > 0"
    >
      <ul >
        <router-link
          :to="{ name: 'Pokemon', params: { pokemonId: pokemonList[index].id }}"
          v-for="(n,index) in batchEndPosition"
          :key="index"
          tag="li"
        >
          <div class="header">
            #{{pokemonList[index].id | index}} 
            <span class="capitalize">{{pokemonList[index].name}}</span>
          </div>
          <div class="sprite-container">
            <img 
              :src="pokemonList[index].sprite"
              class="sprite"
            >
          </div>
        </router-link>
      </ul>
    </keep-alive>
    <div 
      v-else
      class="loading"
    >
      <img class="loading-icon" src="@/assets/icons/pokeball_white.png" alt="loading icon">
    </div>
    <div class="trigger" ref="trigger"/>
    
    <!-- Filter -->
    <BaseModal
      v-if="isFilterOpen"
      @closeModal="closeFilter"
      :showCloseButton="false"
    >
      <template #content>
        <FilterPokemon 
          @applyFilters="updateFilters"
        />
      </template>
    </BaseModal>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/layout/Header.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import FilterPokemon from '@/components/FilterPokemon.vue'
import { $filterData } from '@/helpers/pokedexFilters.js'
export default {
  name: 'Pokedex',
  components: {
    Header,
    BaseModal,
    FilterPokemon
  },
  filters: {
    index (value) {
      if(value < 10) {
        return '00' + value
      } else if (value < 100) {
        return '0' + value
      } else {
        return value
      }
    }
  },
  data() {
    return {
      pokemonList: [],

      // Filter and search:
      isFilterOpen: false,
      isSearchOpen: false,
      
      //Batch data:
      currentBatch: 1,
      maxPerBatch: 9,
      loadedCounter: 0,
      showLoader: false
    }
  },
  computed: {
    BASE_URL () {
      return process.env.VUE_APP_ROOT_URL
    },
    batchEndPosition () {
      const endPosition = this.maxPerBatch * this.currentBatch
      if(endPosition <= this.totalResults) {
        return endPosition
      } else {
        
        let remainer = this.totalResults - endPosition
        return this.batchStartPosition + this.maxPerBatch + remainer
      }
    },
    batchStartPosition () {
      return (this.maxPerBatch * this.currentBatch) - this.maxPerBatch
    },
    totalResults () {
      return this.pokemonList.length
    }
  },
  mounted () {
    this.setPokedexMap(true)
  
  },
  methods: {
    getPokemon(pokemonId, arrayIndex) {
      axios.get(`${this.BASE_URL}/pokemon-form/${pokemonId}/`)
      .then(response => {
        this.refineResponseData(response.data, arrayIndex)
        this.loadedCounter ++
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
    getBatchOfPokemon () {
      for(let i= this.batchStartPosition; i < this.batchEndPosition; i++) {
        this.getPokemon(this.pokemonList[i].id+1, i)
      }
      this.currentBatch ++
    },
    scrollTrigger () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            this.getBatchOfPokemon()
          }
        })
      })
      observer.observe(this.$refs.trigger)
    },
    openFilter () {
      this.isFilterOpen = true
    },
    closeFilter() {
      this.isFilterOpen = false
    },
    openSearch () {
      this.isSearchOpen = true
    },
    closeSearch () {
      this.isSearchOpen = false
    },
    updateFilters(filters) {
      this.setPokedexMap(filters)
      this.closeFilter()
    },
    setPokedexMap (filters) {
      this.resetPokedexMap()
      this.pokemonList = $filterData(filters)
      this.scrollTrigger()
    },
    resetPokedexMap () {
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
    justify-content: space-evenly;
    width: 100%;

    li {
      text-align: center;
      margin: 0 1.5% $l;
      width: 30%;
      border-radius: $xxs;
      background: hsla(0, 0%, 90%, 0.2);
      box-shadow: 0 0 10px $blue-light;
      cursor: pointer;

      .header {
        padding: $xxs;
        border-radius: $xxs $xxs 0 0;
        background: $blue;
        font-size: $font-s;
        text-align: center;
      }
      .sprite-container {
        height: 96px;
        .sprite {
          width: 96px;
        }
      }
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