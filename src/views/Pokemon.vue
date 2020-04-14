<template>
  <div>
    
    <!-- The Pokemon -->
    <div
      v-if="pokemon && pokemonSpecies"
      class="pokemon-container"
      :style="'background: #fff'"
      >

      <section class="pokemon-info-container section-1">
        <div class="name-type-container">
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

          <h4>#{{getIndex(pokemonId)}}</h4>

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
          <img 
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
        <!-- About -->
        <transition
          name="slide-h"
          key="tab-1"
          mode="in-out">
          <div
            v-show="metaItems[0].active"
            class="moves-container"
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
            <div>
              Weight {{pokemon.weight}}<br>
              Height {{pokemon.height}}
            </div>

            <!-- Egg group -->
            <h4>Egg group</h4>
            <div 
              v-for="item in pokemonSpecies.eggGroups"
              :key="item.name"> 
              <div class="capitalize">
                {{item.name}}
              </div>
            </div>

          </div>
        </transition>

        <!-- Stats -->
        <transition
          key="tab-2"
          name="slide-h"
          mode="in-out"
        >
      
          <div
            v-show="metaItems[1].active"
            class="stats-container"
          >
            <div 
              class="stat"
              v-for="(stat, index) in pokemon.stats"
              :key="index"
            >
              <div class="uppercase">
                {{stat.stat.name | statName}}
                {{stat.base_stat}}
              </div>
              
              <div class="stat-bar">
                <div
                  class="stat-bar-fill"
                  :style="cssStatWidth(stat.base_stat)"
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- Moves -->
        <transition
          name="fade"
          key="tab-3"
          mode="in-out">
          <div
            v-show="metaItems[2].active"
            class="moves-container"
          >
            <!-- <pre>
              {{pokemon}}
            </pre> -->
          </div>
        </transition>
        
      </section>
      
      <section class="section-3">
          <!-- Pagination -->
      <div class="pagination-container">
        <router-link
          :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber -1 }}"
        >
          <BaseButton
            :disabled="isFirstPokemon"
            class="ghost"
          >
            Prev
          </BaseButton>
        </router-link>

        <router-link
          :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber +1 }}"
        >
          <BaseButton
            :disabled="isLastPokemon"
            class="ghost"
          >
            Next
          </BaseButton>
        </router-link>
      </div>
      </section>
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
        return 'spc. defense'
      }
      else if (value === 'special-attack') {
        return 'spc. attack'
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
      networkBase: 'http://192.168.0.18:8080/',

      pokemon: null,
      pokemonSpecies: null,
      NUM_OF_POKEMON: 250,
      isTypeModalOpen: false,
      currentTypeInModal: null,

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
    isFirstPokemon () {
      return this.pokemonIdNumber === 1
    },
    isLastPokemon () {
      return this.pokemonIdNumber === this.NUM_OF_POKEMON
    }
  },
  watch: {
    $route() {
      let that = this
      setTimeout(function () {
        that.getPokemonSpecies(that.pokemonId)
        that.getPokemon(that.pokemonId)
        that.changeMetaTab(0)
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
    grid-template-rows: 45vh 50vh auto;

    .section-1 {
      grid-row-start: 1;
    }
    .section-2 {
      grid-row-start: 2;
    }
    .section-3 {
      grid-row-start: 3;
    }

    // Section 1
    .pokemon-info-container {
      padding: $m;

      .name-type-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

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
        justify-content: center;

        .pokemon-sprite {
          object-fit: contain;
          width:  $xxxxl;
          height: $xxxxl;
        }
      }
    }
    
    // Section 2
    .meta-container {
      //background: #fff;
      border-radius: $l $l 0 0;
      padding: $xl $m;
      overflow-y: auto;

      .meta-tabs {
        margin-bottom: $l;
      }

      .stats-container {
        display: flex;
        flex-direction: column;
        color: #000;
        width: 100%;
  
        .stat {
          padding: $s;
  
          .stat-bar {
            background: #ddd;
            border-radius: $xs;
            position: relative;
            width: 100%;
            height: $s;
  
            .stat-bar-fill {
              @include progress-grow(var(--width));
              position: absolute;
              border-radius: $xs;
              background: $blue-light;
              height: $s;
              width: var(--width);
            }
          }
        }
      }
    }

    // Section 3
    .pagination-container {
      display: flex;
      justify-content: space-between;
      margin: 0;
      align-items: center;
      padding: 0 $m;
    }
  }
  
</style>