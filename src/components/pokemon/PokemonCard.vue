<template>
  <div>
    <!-- The Pokemon -->
    <div v-touch:swipe="swipePokemon">
      <div
        v-if="isPokemonLoaded"
        class="pokemon-container"
        :style="getModalBackground"
      >
        <!-- Pokemon Cover -->
        <section :class="['pokemon-cover section-1', {'isZoom': isPokemonZoom}]">
          <div class="white-bar">
            <div class="name-type-container">
              <!-- Name -->
              <h3 class="capitalize pokemon-name">
                {{ pokemon.name }}
              </h3>

              <!-- Type(s) -->
              <div class="type-container">
                <BaseTypeTag
                  v-for="type in pokemon.types"
                  :key="type.slot"
                  :type="type.type.name"
                  class="tag-item"
                  @click="openTypeModal(type.type)"
                />
              </div>
            </div>

            <!-- Index #number -->
            <div class="index-number">
              <h6>#{{ getIndex(pokemonId) }}</h6>
            </div>
          </div>

          <div class="pagination-buttons">
            <div
              v-if="!isFirstPokemon"
              class="left-button"
              @click="paginatePokemon('previous')"
            >
              <fa-icon icon="chevron-left" />
            </div>
            <div
              v-if="!isLastPokemon"
              class="right-button"
              @click="paginatePokemon('next')"
            >
              <fa-icon icon="chevron-right" />
            </div>
          </div>

          <!-- Sprite -->
          <transition
            :name="slideDirection"
            mode="out-in"
          >
            <div
              class="pokemon-sprite-container"
              :key="pokemonId"
            >
              <img
                v-if="!offloadSprite"
                :src="getSprite(pokemon.id)"
                :style="pokemonSpriteHeight"
                :class="['pokemon-sprite', {'zoom': isPokemonZoom}]"
                alt="pokemon sprite"
              >
              <!-- Loading pokemon sprite -->
              <transition
                v-else 
                name="fade"
                mode="in-out"
              >
                <div class="loading">
                  <BaseProgressSpinner />
                </div>
              </transition>
            </div>
          </transition>

          <!-- Zoom on sprite button -->
          <div
            class="zoom-pokemon-button"
            @click="toggleZoom()"
          >
            <fa-icon :icon="isPokemonZoom ? 'search-minus' : 'search-plus'" />
          </div>
        </section>

        <!-- Meta container -->
        <transition
          name="slide-v"
          mode="out-in"
        >
          <section 
            v-if="!isPokemonZoom"
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
                mode="out-in"
              >
                <!-- About -->
                <div
                  v-if="metaItems[0].active"
                  key="tab-about"
                  class="about-container"
                >
                  <PokemonBaseStats :pokemon="pokemon" />
                  <PokemonAbout
                    :pokemon="pokemon"
                    :pokemon-species="pokemonSpecies"
                  />
                </div>

                <!-- Moves -->
                <div
                  v-if="metaItems[1].active"
                  key="tab-moves"
                  class="moves-container"
                >
                  <PokemonMoves
                    v-if="pokemonId <= 251"
                    :pokemon-id="pokemonId"
                    :types="pokemonTypes"
                  />
                  <div 
                    v-else
                    style="color: #888; text-align: center; padding: 60px 0;"
                  >
                    <h5>Whups, comming soon</h5>
                    <h6>Only available for Kanto and Johto pokémon</h6>
                  </div>
                </div>
              </transition>
            </div>
          </section>
        </transition>
      </div>
      <!-- Skeleton loading -->
      <div
        v-else
        class="pokemon-container"
        style="background: #222"
      >
        <section class="pokemon-cover section-1">
          <div class="name-type-container">
            <div class="skeleton-block-line" />
          </div>
          <div class="loading">
            <BaseProgressSpinner />
          </div>
        </section>
        <section class="meta-container section-2" />
      </div>
    </div>

    <!-- Type modal -->
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal"
    >
      <TypeModal :type-name="currentTypeInModal" />
    </BaseModal>
  </div>
</template>

<script>
import { $getTypeColor } from "@/helpers/types.js";
import BaseModal from "@/components/base/BaseModal";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner";
import BaseTab from "@/components/base/BaseTab";
import BaseTypeTag from "@/components/base/BaseTypeTag";
import PokeApi from '@/service/pokeApi.js'
import PokemonAbout from "@/components/pokemon/PokemonAbout.vue";
import PokemonBaseStats from "@/components/pokemon/PokemonBaseStats.vue";
import PokemonMoves from "@/components/pokemon/PokemonMoves.vue";
import TypeModal from "@/components/types/TypeModal";

export default {
  name: "PokemonCard",
  components: {
    BaseModal,
    BaseProgressSpinner,
    BaseTab,
    BaseTypeTag,
    PokemonAbout,
    PokemonBaseStats,
    PokemonMoves,
    TypeModal
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
    },
    isFirstPokemon: {
      type: Boolean,
      required: true
    },
    isLastPokemon: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isPokemonZoom: false,
      pokemon: null,
      pokemonSpecies: null,
      offloadSprite: false,
      slideDirection: "",

      // Texture
      texture: require("@/assets/textures/grid-texture.png"),

      // Type modal
      isTypeModalOpen: false,
      currentTypeInModal: null,


      metaItems: [
        {
          name: "about",
          active: true
        },
        {
          name: 'moves',
          active: false
        }
      ]
    };
  },
  computed: {
    isPokemonLoaded() {
      return this.pokemon && this.pokemonSpecies;
    },
    pokemonSpriteHeight() {
      const height = this.pokemon.height / 10
      
      return {
        'min-height': '50%',
        'height': 0.7 * (height * 100) + '%',
        'max-height': '90%'
      }
    },
    firstType() {
      const type = this.pokemon.types.find(type => type.slot === 1);
      return type.type.name;
    },
    pokemonTypes() {
      let types = []
      this.pokemon.types.forEach(type => {
        types.push(type.type.name)
      });
      return types
    },
    getModalBackground() {
      return {
        background: "url(" + this.texture + ")",
        backgroundColor: $getTypeColor(this.firstType),
        backgroundBlendMode: "screen"
      };
    }
  },
  watch: {
    pokemonId () {
      this.offloadSprite = true
      this.getPokemon(this.pokemonId);
      this.getPokemonSpecies(this.pokemonId);  
    }
  },
  mounted() {
    this.getPokemon(this.pokemonId);
    this.getPokemonSpecies(this.pokemonId);
  },
  methods: {
    // API
    async getPokemon (id) {
      let response = await PokeApi.getPokemonById(id)
      this.refinePokemonData(response.data);
      
      if (response.error) {
        console.log('error') // TODO: replace with toast
      }
    },
    async getPokemonSpecies (id) {
      let response = await PokeApi.getPokemonSpeciesById(id)
      this.refineSpeciesData(response.data);
      
      if (response.error) {
        alert('error') // TODO: replace with toast
      }
    },
    refinePokemonData(data) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        abilities: data.abilities,
        stats: data.stats,
        types: data.types,
        weight: data.weight,
        height: data.height
      };
      this.pokemon = pokemonData;
      this.offloadSprite = false
    },
    refineSpeciesData(data) {
      const description = data.flavor_text_entries.find(item => {
        return item.language.name === 'en' 
      })
      const speciesData = {
        eggGroups: data.egg_groups,
        description: description,
        captureRate: data.capture_rate,
        baseHappiness: data.base_happiness,
        growthRate: data.growth_rate.name,
        hatchCounter: data.hatch_counter
      };
      this.pokemonSpecies = speciesData;
    },
    getSprite(id) {
      return "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png";
    },
    getIndex(value) {
      if (value < 10) {
        return "00" + value;
      } else if (value < 100) {
        return "0" + value;
      } else {
        return value;
      }
    },
    changeMetaTab(index) {
      this.metaItems.forEach(tab => {
        tab.active = false;
      });
      this.metaItems[index].active = true;
    },
    openTypeModal(type) {
      this.currentTypeInModal = type.name;
      this.isTypeModalOpen = true;
    },
    closeTypeModal() {
      this.isTypeModalOpen = false;
    },
    swipePokemon(direction) {
      if (direction === "swiperight") {
        this.paginatePokemon ('previous')
      }
      if (direction === "swipeleft") {
        this.paginatePokemon ('next')
      }
    },
    paginatePokemon (direction) {
      this.slideDirection = (direction === 'next') ? 'slide-h-r' : 'slide-h-l'
      this.$emit('paginate-pokemon', direction)
    },
    toggleZoom () {
      this.isPokemonZoom = !this.isPokemonZoom
    }
  }
};
</script>

<style lang="scss" scoped>

.pokemon-container {
  display: grid;
  height: 98vh;
  grid-template-columns: 100%;
  grid-template-rows: 42% 58%;
  overflow: hidden;
  transition: background-color 1000ms linear;

  .section-1 {
    grid-row-start: 1;
  }
  .section-2 {
    grid-row-start: 2;
    background: #fff;
  }

  // Section 1
  .pokemon-cover {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .loading {
      margin-top: 20vh;
    }
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

          .tag-item:first-child {
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
    .pagination-buttons {
      position: absolute;
      top: 25%;
      width: 100%;

      .left-button, 
      .right-button {
        position: absolute;
        color: #ffffffaa;
        cursor: pointer;
        font-size: $font-xs;
        border: 1px solid #ffffff88;
        border-radius: $s;
        padding: $s 6px;
        text-align: center;
        margin: 0 $xs;
      }

      .left-button {
        left: 0%;
      }
      .right-button {
        right: 0%;
      }
    }
    .pokemon-sprite-container {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: calc(100% - #{$xxl});
      padding: $l 0;
      box-sizing: border-box;

      .pokemon-sprite {
        position: relative;
        top: 0;
        transition: height .4s ease-out, top .4s ease-out;
        z-index: 10;

        &.zoom {
          top: 100%;
          height: 125% !important;
          max-height: 125% !important;
          transition: height .4s ease-in, top .4s ease-in;
        }

        @media (min-width: 1024px) {
          height: 192px;
        }
      }
    }
    .zoom-pokemon-button {
      position: absolute;
      top: 37%;
      right: $xs;
      color: #ffffffdd;
      font-size: $font-xs;
      border: 1px solid #ffffffaa;
      padding: $xxs $s;
      border-radius: $s;
    }
  }

  // Section 2
  .meta-container {
    border-radius: $s $s 0 0;
    padding: $m;
    margin: 0 $xs;
    display: flex;
    flex-direction: column;

    .tab-content {
      padding: $m $xxs;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}

.dark {
  .pokemon-container {
      .pokemon-cover {
        .white-bar {
          background: #333;
          
          .pokemon-name {
            color: #fff;
          }
        }
      }
    .section-2 {
      background: #333;
    }
  }
}
</style>
