<template>
  <div>
    <!-- The Pokemon -->
    <div
      v-if="isPokemonLoaded"
      class="pokemon-container"
      :style="'background: linear-gradient(300deg, ' + getTypeColor( firstType ) + ' 0%, #fff 100%)'">
      <!-- Swipe pagination -->

      <section
        v-touch:swipe="swipe"
        class="pokemon-info-container section-1"
      >
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
            <BaseTypeTag
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
          class="tab-header"
          :items="metaItems"
          @changeTab="changeMetaTab"
        />

        <div class="tab-content">
          <transition
            name="fade"
            mode="out-in">
            <!-- About -->
            <div
              v-if="metaItems[0].active"
              key="tab-about"
              class="about-container"
            >
              <PokemonAbout
                :pokemon="pokemon"
                :pokemonSpecies="pokemonSpecies"
              />
            </div>

            <!-- Stats -->
            <div
              v-if="metaItems[1].active"
              key="tab-stats"
              class="stats-container"
            >
              <PokemonBaseStats
                :pokemon="pokemon"
              />
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
        </div>
      </section>
    </div>

    <!-- Pagination | fixed -->
    <!-- <div class="pagination-container">
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
    </div> -->

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
//import BaseButton from '@/components/base/BaseButton'
import BaseModal from '@/components/base/BaseModal'
import BaseTab from '@/components/base/BaseTab'
import BaseTypeTag from '@/components/base/BaseTypeTag'
import Type from '@/components/types/Type'
import axios from 'axios'
import PokemonAbout from '@/components/pokemon/PokemonAbout.vue'
import PokemonBaseStats from '@/components/pokemon/PokemonBaseStats.vue'
export default {
  name: 'Pokemon',
  components: {
    //BaseButton,
    BaseModal,
    BaseTab,
    BaseTypeTag,
    PokemonAbout,
    PokemonBaseStats,
    Type
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    },
  },
  data() {
    return {
      pokemon: null,
      pokemonSpecies: null,
      NUM_OF_POKEMON: 250,
      isTypeModalOpen: false,
      currentTypeInModal: null,
      isLoadingPokemon: false,

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
      return process.env.VUE_APP_ROOT_URL
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
    },
    firstType () {
      const type = this.pokemon.types.find(type => type.slot === 1)
      return type.type.name
    },
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
      axios.get(`${this.BASE_URL}/pokemon-species/${pokemonId}`)
      .then(response => {
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
      this.isLoadingPokemon = false
    },
    refineSpeciesData(data) {
      const speciesData = {
        eggGroups: data.egg_groups,
        captureRate: data.capture_rate,
        baseHappiness: data.base_happiness,
        growthRate: data.growth_rate.name,
        hatchCounter: data.hatch_counter
      }
      this.pokemonSpecies = speciesData
    },
    /* cssStatWidth (width) {
      let value = this.getPercentage(width, 255)
      return { '--width': value + '%'}
    }, */
    getIndex (value) {
      if(value < 10) {
        return '00' + value
      } else if (value < 100) {
        return '0' + value
      } else {
        return value
      }
    },
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
    },
    swipe(direction) {
      if(direction === 'swiperight') {
        this.$router.push({
          name: 'Pokemon', params: { pokemonId: this.pokemonIdNumber -1 }
        })
      }
      if(direction === 'swipeleft') {
        this.$router.push({
          name: 'Pokemon', params: { pokemonId: this.pokemonIdNumber +1 }
        })
      }
      
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
          flex-direction: row-reverse;

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
      border-radius: $xl $xl 0 0;
      padding: $m;
      display: flex;
      flex-direction: column;

      .tab-header {
        margin-bottom: $l;
      }

      .tab-content { 
        overflow-y: auto;
        overflow-x: hidden;
        height: 80%;
        padding: 0 $xl;
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