<template>
  <div class="default-page-margin">
    <router-link
      :to="{ name: 'Pokedex'}"
    >
      <h6>Back</h6>
    </router-link>
    
    <!-- The Pokemon -->
    <div
      v-if="pokemon"
      class="pokemon-container"
    >
      <section class="pokemon-info-container"> 
        <div class="name-type-container">
          <!-- Name -->
          <h2
            class="uppercase letter-spacing condensed pokemon-name">
            {{pokemon.name}}
          </h2>

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
            :src="getPokemonSprite(pokemon)"
            class="pokemon-sprite"
            alt="pokemon sprite"
          >
        </div>
      </section>

      <!-- Meta container -->
      <section class="meta-container">
        <BaseTab
          class="meta-tabs"
          :items="metaItems"
          @changeTab="changeMetaTab"
        />
        <transition
          key="tab-1"
          name="fade"
          mode="in-out"
        >
          <div
            v-show="metaItems[0].active"
            class="stats-container"
          >
            <div 
              class="stat"
              v-for="(stat, index) in pokemon.stats"
              :key="index"
            >
              <div class="uppercase condensed">
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
        <transition
          name="fade"
          key="tab-2"
          mode="in-out"
        >
          <div
            v-show="metaItems[1].active"
            class="moves-container"
          >
            <pre>
              {{pokemon.moves}}
            </pre>
          </div>
        </transition>
      </section>
      <!-- Stats -->
    </div>

    <!-- Pagination -->
    <div class="pagination-container">
      <router-link
        :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber -1 }}"
      >
        <BaseButton
          :disabled="isFirstPokemon"
        >
          Prev
        </BaseButton>
      </router-link>

      <h4 class="condensed">#{{getIndex(pokemonId)}}</h4>

      <router-link
        :to="{ name: 'Pokemon', params: { pokemonId: pokemonIdNumber +1 }}"
      >
        <BaseButton
          :disabled="isLastPokemon"
        >
          Next
        </BaseButton>
      </router-link>
    </div>
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal"
    >
      <template #type>
        <div class="modal-type-container">
          <img 
            class="type-icon" 
            :src="getIcon(currentTypeInModal.name)" 
            alt="type-icon"
            :style="'background:' + getTypeColor(currentTypeInModal.name)"
          >
          <h3 class="type-title condensed uppercase">{{currentTypeInModal.name}}</h3>
          <p>
            Most Flying type Pokémon are based on birds or insects, along with some mythical creatures like dragons. On average they are faster than any other type.
          </p>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton'
import BaseModal from '@/components/base/BaseModal'
import BaseTab from '@/components/base/BaseTab'
import BaseTag from '@/components/base/BaseTag'
import axios from 'axios'
export default {
  name: 'Pokemon',
  components: {
    BaseButton,
    BaseModal,
    BaseTab,
    BaseTag
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
      NUM_OF_POKEMON: 250,
      isTypeModalOpen: false,
      currentTypeInModal: null,
      metaItems: [
        {
          name: 'base stats',
          active: true
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
        that.getPokemon(that.pokemonId)
        that.changeMetaTab(0)
      }, 500)
    }
  },
  mounted () {
    this.getPokemon(this.pokemonId)
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
        console.log(response.data)
        this.pokemon = response.data
      })
      .catch(error => {
        console.log(error)
        // this.errored = true
      })
    },
    cssStatWidth (width) {
      let value = this.getPercentage(width, 255)
      return { '--width': value + '%'}
    },
    getPokemonSprite (pokemon) {
      if(pokemon.id <= 151) {
        return 'https://henriko.no/gen1/' + this.getIndex(pokemon.id) + '.png'
      } else {
        return pokemon.sprites.front_default
      }
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
      console.log('sdf')
      this.currentTypeInModal = type
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
    display: flex;
    flex-direction: column;
    justify-content: center;

    .pokemon-info-container {
      display: flex;
      justify-content: space-between;

      .name-type-container {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .pokemon-name {
          color: #222;
        }
        .type-container {
          display: flex;
          margin: $m 0;

          .tag-item {
            margin-right: $s;
          }
        }
      }
      .pokemon-sprite-container {
        align-self: flex-end;

        .pokemon-sprite {
          object-fit: contain;
          width: $xxxxl;
          height: $xxxxl;
        }
      }
    }

    .meta-container {
      background: #fff;
      border-radius: $s;
      padding: $l $m;

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
            background: $blue-dark;
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
  }
  .pagination-container {
    display: flex;
    justify-content: space-between;
    margin: $xl 0;
    align-items: center;
  }
  .modal-type-container {
    display: flex;
    padding: $l;
    text-align: center;
    flex-direction: column;
    align-items: center;

    .type-title {
      margin-bottom: $l;
    }
    .type-icon {
      margin: $m 0 $xl 0;
      border-radius: 50%;
      padding: $m;
      background: #333;
      width: $xxl;
      height: $xxl;
    }
    p {
      margin-bottom: $s;
    }
  }
</style>