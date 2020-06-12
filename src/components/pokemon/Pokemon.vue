<template>
  <div>
    <!-- The Pokemon -->
    <div
      v-if="isPokemonLoaded"
      v-touch:swipe="swipePokemon"
      class="pokemon-container"
      :style="getModalBackground"
    >
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
            <h6>#{{ getIndex(animatedIndex) }}</h6>
          </div>
        </div>

        <div class="pagination-buttons">
          <div
            v-if="!isFirstPokemon"
            class="left-button"
            @click="paginatePreviousPokemon()"
          >
            <fa-icon icon="chevron-left" />
          </div>
          <div
            v-if="!isLastPokemon"
            class="right-button"
            @click="paginateNextPokemon()"
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
            :key="pokemon.id"
          >
            <img
              :src="getSprite(pokemon.id)"
              class="pokemon-sprite"
              :class="{'zoom': isPokemonZoom}"
              alt="pokemon sprite"
            >
          </div>
        </transition>

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
                <PokemonAbout
                  :pokemon="pokemon"
                  :pokemon-species="pokemonSpecies"
                />
              </div>

              <!-- Stats -->
              <div
                v-if="metaItems[1].active"
                key="tab-stats"
                class="stats-container"
              >
                <PokemonBaseStats :pokemon="pokemon" />
              </div>

              <!-- Moves -->
              <div
                v-if="metaItems[2].active"
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
      style="background: #08a"
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

    <!-- Type modal -->
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal"
    >
      <Type :type="currentTypeInModal" />
    </BaseModal>
  </div>
</template>

<script>
import { $getTypeColor } from "@/helpers/types.js";
import { gsap } from "gsap";
import BaseModal from "@/components/base/BaseModal";
import BaseTab from "@/components/base/BaseTab";
import BaseTypeTag from "@/components/base/BaseTypeTag";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner";
import PokeApi from '@/service/pokeApi.js'
import PokemonAbout from "@/components/pokemon/PokemonAbout.vue";
import PokemonBaseStats from "@/components/pokemon/PokemonBaseStats.vue";
import PokemonMoves from "@/components/pokemon/PokemonMoves.vue";
import Type from "@/components/types/Type";

export default {
  name: "Pokemon",
  components: {
    BaseModal,
    BaseTab,
    BaseProgressSpinner,
    BaseTypeTag,
    PokemonAbout,
    PokemonBaseStats,
    PokemonMoves,
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
      default: 0
    }
  },
  data() {
    return {
      currentTypeInModal: null,
      isLoadingPokemon: false,
      isTypeModalOpen: false,
      pokemon: null,
      pokemonSpecies: null,
      slideDirection: "",
      tweenedNumber: this.pokemonId,
      isPokemonZoom: false,

      // Texture
      texture: require("@/assets/textures/grid-texture.png"),

      metaItems: [
        {
          name: "about",
          active: true
        },
        {
          name: "base stats",
          active: false
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
    pokedexIds() {
      return this.$store.state.pokedexIds;
    },
    isFirstPokemon() {
      return this.pokemonIndex === 0;
    },
    isLastPokemon() {
      return this.pokemonIndex === this.pokedexIds.length - 1;
    },
    getModalBackground() {
      return {
        background: "url(" + this.texture + ")",
        backgroundColor: $getTypeColor(this.firstType),
        backgroundBlendMode: "screen"
      };
    },
    animatedIndex() {
      return parseInt(this.tweenedNumber).toFixed(0);
    }
  },
  watch: {
    $route() {
      
        this.getPokemonSpecies(this.pokemonId);
        this.getPokemon(this.pokemonId);
    },
    pokemonId(newVal) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newVal });
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
      this.isLoadingPokemon = false;
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
        this.paginatePreviousPokemon()
      }
      if (direction === "swipeleft") {
        this.paginateNextPokemon()
      }
    },
    paginatePreviousPokemon () {
      if(!this.isFirstPokemon) {
        this.slideDirection = "slide-h-l";
        this.$router.push({
          name: "Pokemon",
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, "previous"),
            pokemonIndex: this.pokemonIndex - 1
          }
        });
      }
    },
    paginateNextPokemon () {
      if(!this.isLastPokemon) {
        this.slideDirection = "slide-h-r";
        this.$router.push({
          name: "Pokemon",
          params: {
            pokemonId: this.getPokemonPaginationId(this.pokemonIndex, "next"),
            pokemonIndex: this.pokemonIndex + 1
          }
        });
      }
    },
    getPokemonPaginationId(index, direction) {
      if (direction === "previous") {
        return this.pokedexIds[index - 1];
      } else {
        return this.pokedexIds[index + 1];
      }
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
  height: 96vh;
  grid-template-columns: 100%;
  grid-template-rows: 45% 55%;
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
      align-items: center;
      height: 100%;

      .pokemon-sprite {
        position: relative;
        height: 164px;
        transition: height .2s ease-in;
        z-index: 10;

        &.zoom {
          height: 216px;
          transition: height .4s ease-in;
        }

        @media (min-width: 1024px) {
          height: 192px;
        }
      }
    }
    .zoom-pokemon-button {
      position: absolute;
      top: 39%;
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
    border-radius: $m $m 0 0;
    padding: $m;
    margin: 0 10px;
    display: flex;
    flex-direction: column;

    .tab-content {
      overflow-y: auto;
      overflow-x: hidden;
      padding: $m $m;
    }
  }
}
</style>
