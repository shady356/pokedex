<template>
  <div>
    
    <!-- The Pokemon -->
    <div
      v-if="isPokemonLoaded"
      class="pokemon-container"
      >

      <section class="pokemon-info-container section-1">
        <div class="name-type-container">

          <!-- Back icon -->
          <router-link
            :to="{ name: 'Pokedex'}"
          >
            <img :src="arrowBack" alt="back">
          </router-link>

          <!-- Name -->
          <h1
            class="capitalize pokemon-name">
            {{pokemon.name}}
          </h1>

          <!-- Index #number -->
          <h6>#{{getIndex(pokemonId)}}</h6>

          <!-- Type(s) -->
          <div class="type-container">
            <BaseTag
              v-for="type in pokemon.types"
              :key="type.slot"
              :icon="getIcon(type.type.name)"
              :iconColor="getTypeColor(type.type.name)"
              :title="type.type.name"
              class="tag-item"
              @click="openTypeModal(type.type)"
            />
          </div>
        </div>

        <!-- Sprite -->
        <div class="pokemon-sprite-container">
          <div
            v-if="isLoadingPokemon"
            class="loading-pokemon-sprite"
          />
          <img
            v-else 
            :src="pokemon.sprite"
            class="pokemon-sprite"
            alt="pokemon sprite"
          >
        </div>
      </section>

      <!-- Meta container -->
      <section class="meta-container section-2">

        <BaseTab
          class="meta-tabs"
          :items="metaItems"
          @changeTab="changeMetaTab"
        />

        <transition
          name="fade"
          mode="out-in"
        >
          <!-- About -->
          <div
            v-if="metaItems[0].active"
            key="tab-about"
            class="about-container"
          >
            <!-- Abilities -->
            <h4>Abilities</h4>
            <div 
              v-for="item in pokemon.abilities"
              :key="item.ability.name"> 
              <div class="capitalize">
               {{item.ability.name}} <span v-if="item.is_hidden"> (Hidden)</span>
              </div>
            </div>

            <!-- Weight and height -->
            <h4>Weight and height</h4>
            <div>
              Weight {{pokemon.weight}}<br>
              Height {{pokemon.height}}
            </div>

            <!-- Egg group -->
            <img class="egg-icon" src="@/assets/icons/egg-solid.svg" alt="">
            <h4>Egg group</h4>
            <div 
              v-for="item in pokemonSpecies.eggGroups"
              :key="item.name"> 
              <div class="capitalize">
                {{item.name}}
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div
            v-if="metaItems[1].active"
            key="tab-stats"
            class="stats-container"
          >
            <div 
              class="stat-item"
              v-for="(stat, index) in pokemon.stats"
              :key="index"
            >
              <div :class="['stat-label', {'highlight': isBestStat(stat)}]">
                <p class="stat-key uppercase">{{stat.stat.name | statName}}</p>
                <p class="stat-value">{{stat.base_stat}}</p>
              </div>
                
              <div class="stat-bar">
                <div 
                  v-for="index in BASE_STAT_TOTAL"
                  :key="index"
                  :class="['stat-bar-fragment', {'is-filled': getStatFillStatus(index, stat.base_stat)}]"
                />
              </div>
            </div>
          </div>

          <!-- Moves -->
          <div
            v-if="metaItems[2].active"
            key="tab-moves"
            class="moves-container"
          >
            Moves
            <!-- <pre>
              {{pokemon}}
            </pre> -->
          </div>

        </transition>
      </section>
    </div>

    <!-- Pagination | fixed -->
    <div class="pagination-container">
      <router-link
        :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber -1 }}"
      >
        <BaseButton
          :disabled="isFirstPokemon"
          class="pagination previous"
        >
          Prev
        </BaseButton>
      </router-link>

      <router-link
        :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber +1 }}"
      >
        <BaseButton
          :disabled="isLastPokemon"
          class="pagination next"
        >
          Next
        </BaseButton>
      </router-link>
    </div>

    <!-- Type modal -->
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal">
      <template #content>
        <Type
          :type="currentTypeInModal"
        />
      </template>
    </BaseModal>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton'
import BaseModal from '@/components/base/BaseModal'
import BaseTab from '@/components/base/BaseTab'
import BaseTag from '@/components/base/BaseTag'
import Type from '@/components/types/Type'
import axios from 'axios'
export default {
  name: 'Pokemon',
  components: {
    BaseButton,
    BaseModal,
    BaseTab,
    BaseTag,
    Type
  },
  filters: {
    statName(value) {
      if (value === 'special-defense') {
        return 'spc. def'
      }
      else if (value === 'special-attack') {
        return 'spc. att'
      }
      else {
        return value
      }
    }
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    },
  },
  data() {
    return {
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.84.24:8080/',

      pokemon: null,
      pokemonSpecies: null,
      NUM_OF_POKEMON: 250,
      isTypeModalOpen: false,
      currentTypeInModal: null,
      isLoadingPokemon: false,
      BASE_STAT_TOTAL: 16,
      bestStat: {},

      // icons
      arrowBack: require('@/assets/icons/arrow_back-24px.svg'),

      metaItems: [
        {
          name: 'about',
          active: true
        },
        {
          name: 'base stats',
          active: false
        },
        {
          name: 'moves',
          active: false
        }
      ]
    }
  },
  computed: {
    BASE_URL () {
      return this.networkBase
    },
    pokemonIdNumber () {
      return parseInt(this.pokemonId)
    },
    isPokemonLoaded () {
      return this.pokemon && this.pokemonSpecies
    },
    isFirstPokemon () {
      return this.pokemonIdNumber === 1
    },
    isLastPokemon () {
      return this.pokemonIdNumber === this.NUM_OF_POKEMON
    }
  },
  watch: {
    $route() {
      this.isLoadingPokemon = true
      let that = this
      setTimeout(function () {
        that.getPokemonSpecies(that.pokemonId)
        that.getPokemon(that.pokemonId)
      }, 500)
    }
  },
  mounted () {
    this.getPokemon(this.pokemonId)
    this.getPokemonSpecies(this.pokemonId)
  },
  methods: {
    getIcon(name) {
      return require('@/assets/icons/types/' + name + '.svg')
    },
    getTypeColor (type) {
      switch(type) {
          case 'bug':     return '#92BC2C'; 
          case 'dark':    return '#595761'; 
          case 'dragon':  return '#0C69C8'; 
          case 'electric':return '#F2D94E'; 
          case 'fire':    return '#FBA54C'; 
          case 'fairy'    :return '#EE90E6'; 
          case 'fighting' :return '#D3425F'; 
          case 'flying'   :return '#A1BBEC'; 
          case 'ghost'    :return '#5F6DBC'; 
          case 'grass'    :return '#5FBD58'; 
          case 'ground'   :return '#DA7C4D'; 
          case 'ice'      :return '#75D0C1'; 
          case 'normal'   :return '#A0A29F'; 
          case 'poison'   :return '#B763CF'; 
          case 'psychic'  :return '#FA8581'; 
          case 'rock'     :return '#C9BB8A'; 
          case 'steel'    :return '#5695A3'; 
          case 'water'    :return '#539DDF'; 
      }
    },
    getPercentage (part, whole) {
      return (part / whole) * 100
    },
    getPokemon(pokemonId) {
      axios.get(`${this.BASE_URL}/pokemon/${pokemonId}/`)
      .then(response => {
        this.refineResponseData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getPokemonSpecies(pokemonId) {
      axios.get(`${this.BASE_URL}pokemon-species/${pokemonId}`)
      .then(response => {
        console.log(response.data)
        this.refineSpeciesData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    setBestStat() {
      let bestStat = { 
        name: this.pokemon.stats[0].stat.name,
        value: this.pokemon.stats[0].base_stat
      }
      this.pokemon.stats.forEach(stat => {
        if (stat.base_stat >= bestStat.value) {
          bestStat.name = stat.stat.name
          bestStat.value = stat.base_stat
        }
      })
      this.bestStat = bestStat
    },
    isBestStat(stat) {
      return this.bestStat.name === stat.stat.name
    },
    refineResponseData(data) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        abilities: data.abilities,
        stats: data.stats,
        types: data.types,
        weight: data.weight,
        height: data.height
      }
      this.pokemon = pokemonData
      this.isLoadingPokemon = false
      this.setBestStat()
    },
    refineSpeciesData(data) {
      const speciesData = {
        eggGroups: data.egg_groups
      }
      this.pokemonSpecies = speciesData
    },
    cssStatWidth (width) {
      let value = this.getPercentage(width, 255)
      return { '--width': value + '%'}
    },
    getStatFillStatus(index, value) {
      const fragment = Math.ceil((value + 1) / this.BASE_STAT_TOTAL)
      return index <= fragment
    },
    getIndex (value) {
      if(value < 10) {
        return '00' + value
      } else if (value < 100) {
        return '0' + value
      } else {
        return value
      }
    },
    //https://pokeapi.co/api/v2/pokemon-species/6/
    changeMetaTab(index) {
      this.metaItems.forEach(tab => {
        tab.active = false
      });
      this.metaItems[index].active = true
    },
    openTypeModal (type) {
      this.currentTypeInModal = type.name
      this.isTypeModalOpen = true
    },
    closeTypeModal () {
      this.isTypeModalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .pokemon-container {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 35vh 65vh;
    overflow: hidden;

    .section-1 {
      grid-row-start: 1;
    }
    .section-2 {
      grid-row-start: 2;
      background: #fff;
    }

    // Section 1
    .pokemon-info-container {
      padding: $m;
      display: flex;
      flex-direction: row;
      align-items: center;

      .name-type-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-basis: 50%;

        .pokemon-name {
          color: #333;
        }
        .type-container {
          display: flex;
          margin-top: $m;

          .tag-item {
            margin-right: $s;
          }
        }
      }
      .pokemon-sprite-container {
        display: flex;
        flex-basis: 50%;
        justify-content: center;
      
        .pokemon-sprite {
          object-fit: contain;
          width: 192px;
        }
      }
    }
    
    // Section 2
    .meta-container {
      border-radius: $l $l 0 0;
      padding: $m;

      .meta-tabs {
        margin-bottom: $l;
      }

      .about-container {
        .egg-icon {
          display: inline-flex;
          width: 24px;
          
        }

      }

      .stats-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex-direction: column-reverse;
        align-items: center;
  
        .stat-item {
          padding: $s;
          display: flex;
          flex-direction: row;
          align-items: center;
        
          width: 80%;

          .stat-label {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-basis: 30%;
            justify-content: space-between;

            &.highlight {
              font-weight: 700;
            }
            .stat-value {
              padding-right: 10px;
            }
          }

          .stat-bar {
            display: flex;
            justify-content: flex-end;
            flex-direction: row;
            flex-wrap: nowrap;
            flex-basis: 70%;

            .stat-bar-fragment {
              width: calc(85% / 16);
              height: $xs;
              border-radius: 2px;
              background: #ddd;
              margin-right: $xxs;
              transition: background .4s ease-out;

              &.is-filled {
                background: $blue-light;
                transition: background .4s ease-in;
                animation: scale-x-in .4s ease;
              }
            }
          }
        }
      }
    }
  }
  // Pagination | fixed
  .pagination-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
</style>