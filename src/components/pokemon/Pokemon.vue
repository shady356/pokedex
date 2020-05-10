<template>
  <div>
    <!-- The Pokemon -->
    <div
      v-if="isPokemonLoaded"
      class="pokemon-container"
      :style="getModalBackground"
      v-touch:swipe="swipePokemon"
    >
      <section
        class="pokemon-cover section-1"
      >
        <div class="white-bar">
          <div class="name-type-container">

            <!-- Name -->
            <h3 class="capitalize pokemon-name">
              {{pokemon.name}}
            </h3>

            <!-- Type(s) -->
            <div class="type-container">
              <BaseTypeTag
                v-for="type in pokemon.types"
                :key="type.slot"
                :icon="getIcon(type.type.name)"
                :iconColor="getTypeColor(type.type.name)"
              
                class="tag-item"
                @click="openTypeModal(type.type)"
              />
            </div>
          </div>

          <!-- Index #number -->
          <transition
            name="fade"
            mode="out-in">
            <div 
              class="index-number"
              :key="pokemon.id"
            >
              <h6>#{{ getIndex(pokemon.id) }}</h6>
            </div>
          </transition>
        </div>
      
        <!-- Sprite -->
        <transition
          :name="slideDirection"
          mode="out-in"
        >
          <div 
            class="pokemon-sprite-container"
            :key="pokemon.id"
          >
            <div
              v-if="isLoadingPokemon"
              class="loading-pokemon-sprite"
            /> 
            <img
              v-else
              :src="getSprite(pokemon.id)"
              class="pokemon-sprite"
              alt="pokemon sprite"
            >
          </div>
        </transition>
      </section>

      <!-- Meta container -->
      <transition
        name="slide-v"
        mode="out-in">
        <section 
          class="meta-container section-2" 
        >

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
              <!-- <div
                v-if="metaItems[2].active"
                key="tab-moves"
                class="moves-container"
              >
                Moves
              </div> -->

            </transition>
          </div>
        </section>
      </transition>
    </div>

    <!-- Skeleton loading -->
    <div v-else class="pokemon-container" style="background: #08a">
      <section class="pokemon-info-container section-1">
        
        <div class="name-type-container">
          <div class="skeleton-block-line"/>
        </div>
        <!-- Sprite -->
        <div class="pokemon-sprite-container">
          <div
            class="loading-pokemon-sprite"
          />
        </div>
      </section>
      <section class="meta-container section-2">
        
      </section>
    </div>

    <!-- Type modal -->
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal">
        <Type
          :type="currentTypeInModal"
        />
    </BaseModal>
  </div>
</template>

<script>
//import BaseButton from '@/components/base/BaseButton'
import axios from 'axios'
import BaseModal from '@/components/base/BaseModal'
import BaseTab from '@/components/base/BaseTab'
import BaseTypeTag from '@/components/base/BaseTypeTag'
import PokemonAbout from '@/components/pokemon/PokemonAbout.vue'
import PokemonBaseStats from '@/components/pokemon/PokemonBaseStats.vue'
import Type from '@/components/types/Type'
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
    pokemonIndex: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return {
      pokemon: null,
      pokemonSpecies: null,
      NUM_OF_POKEMON: 250,
      isTypeModalOpen: false,
      currentTypeInModal: null,
      isLoadingPokemon: false,
      slideDirection: 'left',

      // Texture
      texture: require('@/assets/textures/grid-texture.png'),

      metaItems: [
        {
          name: 'about',
          active: true
        },
        {
          name: 'base stats',
          active: false
        }/* ,
        {
          name: 'moves',
          active: false
        } */
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
      return (this.pokemon && this.pokemonSpecies)
    },
    firstType () {
      const type = this.pokemon.types.find(type => type.slot === 1)
      return type.type.name
    },
    pokedexIds () {
      return this.$store.state.pokedexIds
    },
    isFirstPokemon () {
      return this.pokemonIndex === 0
    },
    isLastPokemon () {
      return this.pokemonIndex === this.pokedexIds.length-1
    },
    getModalBackground() {
      return {
        background: 'url(' + this.texture + ')',
        backgroundColor: this.getTypeColor(this.firstType),
        backgroundBlendMode: 'screen'
      }
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
    getIcon(name) {
      return require('@/assets/icons/types/' + name + '.svg')
    },
    getSprite(id) {
      return 'https://pokeres.bastionbot.org/images/pokemon/' + id + '.png'
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
    swipePokemon(direction) {
      if(direction === 'swiperight' && !this.isFirstPokemon) {
        this.slideDirection = 'slide-h-l'
        this.$router.push({
          name: 'Pokemon',
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, 'previous'),
            pokemonIndex: this.pokemonIndex -1
          }
        })
      }
      if(direction === 'swipeleft' && !this.isLastPokemon) {
        this.slideDirection = 'slide-h-r'
        this.$router.push({
          name: 'Pokemon',
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, 'next'),
            pokemonIndex: this.pokemonIndex +1
          }
        })
      }
    },
    getPokemonPaginationId(index, direction) {
      if(direction === 'previous') {
        return this.pokedexIds[index-1]
      }
      else {
        return this.pokedexIds[index+1]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .pokemon-container {
    display: grid;
    height: 96vh;
    grid-template-columns: 100%;
    grid-template-rows: 35% 65%;
    overflow: hidden;
    transition: background-color 1000ms linear;

    .section-1 {
      grid-row-start: 1;
      z-index: 1;
    }
    .section-2 {
      grid-row-start: 2;
      background: #fff;
      z-index: 1;
    }
    
    // Section 1
    .pokemon-cover {
      display: flex;
      flex-direction: column;
      align-items: center;

      .white-bar {
        position: relative;
        border-radius: $m $m 0 0;
        background: #fff;
        width: 100%;
        height: $xxl;
        clip-path: polygon(100% 0, 100% 60%, 75% 60%, 60% 100%, 0 100%, 0 0);

        .name-type-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: $s $m;

          .pokemon-name {
            color: #333;
            margin-right: $s;
          }
          .type-container {
            display: flex;
            flex-direction: row-reverse;
      
            .tag-item:last-child {
              margin-right: $xs;
            }
          }
          .skeleton-block-line {
            background: #ddd;
            border-radius: $xxs;
            width: $xxxxl;
            height: $m;
          }
        }

        .index-number {
          position: absolute;
          top: 15%;
          right: 5%;
        }

      }
      .pokemon-sprite-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75%;
      
        .pokemon-sprite {
          height: 128px;
        }
      }
    }
    
    // Section 2
    .meta-container {
      border-radius: $m $m 0 0;
      padding: $m;
      margin: 0 10px;
      display: flex;
      flex-direction: column;

      .tab-header {
        margin-bottom: $m;
      }

      .tab-content { 
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 $m;
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