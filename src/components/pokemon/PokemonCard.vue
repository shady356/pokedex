<template>
  <div>
    <!-- The Pokemon -->
    <div
      v-if="isPokemonLoaded"
      class="pokemon-container"
      :style="getModalBackground"
    >
      <!-- Pokemon Cover -->
      <section
        :class="['pokemon-cover section-1', {'isZoom': isPokemonZoom}]"
        v-touch:start="startHandler"
        v-touch:moving="movePokemon"
        v-touch:end="endHandler"
      >
        <CardHeader
          :pokemon="pokemon"
          :pokemon-id="pokemonId"
          @openTypeModal="openTypeModal"
        />
        <!-- Pagination buttons -->
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
        <CardSprite
          :slide-direction="slideDirection"
          :pokemon-id="pokemonId"
          :offload-sprite="offloadSprite"
          :pokemon="pokemon"
          :is-pokemon-zoom="isPokemonZoom"
        />
        <!-- Zoom on sprite button -->
        <div
          class="zoom-pokemon-button"
          @click="toggleZoom()"
        >
          <fa-icon :icon="isPokemonZoom ? 'search-minus' : 'search-plus'" />
        </div>
      </section>

      <!-- Meta card container -->
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
                  @openAbilityModal="openAbilityModal"
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
                  style="color: var(--color-text-disabled); text-align: center; padding: 60px 0;"
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
    <!-- Loading screen -->
    <div
      v-else
      class="loading-screen"
    >
      <BaseProgressSpinner size="large" />
    </div>
    <!-- Type modal -->
    <BaseModal
      v-if="isTypeModalOpen"
      @closeModal="closeTypeModal"
    >
      <TypeModal :type-name="currentTypeInModal" />
    </BaseModal>
    <!-- Ability modal -->
    <BaseModal
      v-if="isAbilityModalOpen"
      @closeModal="closeAbilityModal"
    >
      <AbilityModal :ability-name="currentAbilityInModal" />
    </BaseModal>
  </div>
</template>

<script>
import { toRef, computed } from 'vue'
import { $getTypeColor } from "@/helpers/types.js";
import BaseModal from "@/components/base/BaseModal";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner";
import BaseTab from "@/components/base/BaseTab";
import CardHeader from "@/components/pokemon/pokemon-card/CardHeader.vue"
import CardSprite from "@/components/pokemon/pokemon-card/CardSprite.vue"
import { usePokemon, usePokemonSpecies } from '@/composables/usePokeApi.js'
import PokemonAbout from "@/components/pokemon/PokemonAbout.vue";
import PokemonBaseStats from "@/components/pokemon/PokemonBaseStats.vue";
import PokemonMoves from "@/components/pokemon/PokemonMoves.vue";
import TypeModal from "@/components/types/TypeModal";
import AbilityModal from "@/components/pokemon/AbilityModal.vue";

const textures = import.meta.glob('/src/assets/PK_Textures/*.png', { eager: true, import: 'default' })

export default {
  name: "PokemonCard",
  setup(props) {
    const pokemonId = toRef(props, 'pokemonId')

    const pokemonQuery = usePokemon(pokemonId)
    const speciesQuery = usePokemonSpecies(pokemonId)

    const pokemon = computed(() => {
      const d = pokemonQuery.data.value
      if (!d) return null
      return {
        id: d.id,
        name: d.name,
        sprite: d.sprites.front_default,
        abilities: d.abilities,
        stats: d.stats,
        types: d.types,
        weight: d.weight,
        height: d.height,
      }
    })

    const pokemonSpecies = computed(() => {
      const d = speciesQuery.data.value
      if (!d) return null
      const description = d.flavor_text_entries.find(e => e.language.name === 'en')
      return {
        eggGroups: d.egg_groups,
        description,
        captureRate: d.capture_rate,
        baseHappiness: d.base_happiness,
        growthRate: d.growth_rate.name,
        hatchCounter: d.hatch_counter,
      }
    })

    return {
      pokemon,
      pokemonSpecies,
      offloadSprite: pokemonQuery.isFetching,
    }
  },
  components: {
    BaseModal,
    BaseProgressSpinner,
    BaseTab,
    CardHeader,
    CardSprite,
    PokemonAbout,
    PokemonBaseStats,
    PokemonMoves,
    TypeModal,
    AbilityModal
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
      startTouch: 0,
      toPositionPercentage: 0,
      movingGlobal: 0,
      slideDirection: "",
      clientWidth: 0,

      // Type modal
      isTypeModalOpen: false,
      currentTypeInModal: null,

      // Ability modal
      isAbilityModalOpen: false,
      currentAbilityInModal: null,

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
    pokemonTexture() {
      return textures[`/src/assets/PK_Textures/${this.firstType}.png`]
    },
    isPokemonLoaded() {
      return this.pokemon && this.pokemonSpecies;
    },
    firstType() {
      const type = this.pokemon.types.find(type => type.slot === 1);
      return type.type.name;
    },
    pokemonTypes() {
      return this.pokemon.types.map(t => t.type.name)
    },
    getModalBackground() {
      return {
        background: "url(" + this.pokemonTexture + ")",
        backgroundColor: $getTypeColor(this.firstType),
        backgroundBlendMode: "screen",
        backgroundSize: 'cover'
      };
    },
  },
  mounted() {
    this.clientWidth = document.documentElement.clientWidth
  },
  methods: {
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
    openAbilityModal(ability) {
      this.currentAbilityInModal = ability.name;
      this.isAbilityModalOpen = true;
    },
    closeAbilityModal() {
      this.isAbilityModalOpen = false;
    },
    swipePokemon(direction) {
      if (direction === "right") {
        this.paginatePokemon ('previous')
      }
      if (direction === "left") {
        this.paginatePokemon ('next')
      }
    },
    startHandler(e) {
      clearTimeout(this._resetTimer)
      this.startTouch = e.changedTouches[0].clientX
    },
    movePokemon (e) {
      const moveTouch = e.changedTouches[0].clientX
      
      const moving = Math.ceil((((moveTouch) / this.clientWidth * 100) -50) * 2.5)
      const startPosition = Math.ceil((((this.startTouch) / this.clientWidth * 100) -50) * 2.5)
      
      this.toPositionPercentage = this.calcMovingPercentage(moving, startPosition)

      let pokemonSprite = document.getElementById('pokemon-sprite-id')
      pokemonSprite.style.transform = `translateX(${this.toPositionPercentage}%)`
    },
    calcMovingPercentage (moving, startPosition) {
      const screenCenter = this.clientWidth / 2
      let movingPositionPercentage = 0
      if (this.startTouch > screenCenter) {
        movingPositionPercentage = moving - startPosition
      } else if (this.startTouch < screenCenter) {
        movingPositionPercentage = (startPosition - moving) * -1
      } else {
        movingPositionPercentage = moving
      }
      return movingPositionPercentage
    },
    endHandler() {
      const percentageThreshold = 50
      if(this.toPositionPercentage !== 0) {
        if(this.toPositionPercentage < -percentageThreshold && !this.isLastPokemon) {
          this.paginatePokemon('next')
        } else if (this.toPositionPercentage > percentageThreshold && !this.isFirstPokemon) {
          this.paginatePokemon('previous')
        } else {
          const spriteEl = document.getElementById('pokemon-sprite-id')
          spriteEl.style = 'transition: transform .4s ease'
          spriteEl.style.transform = 'translateX(0%)'
          this._resetTimer = setTimeout(() => {
            spriteEl.style = 'transition: none'
          }, 400)
        }
      }
      this.toPositionPercentage = 0
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
  grid-template-rows: 35% 65%;
  overflow: hidden;
  transition: background 1000ms ease-in-out;

  .section-1 {
    grid-row-start: 1;
  }
  .section-2 {
    grid-row-start: 2;
    background: var(--color-bg-primary);
  }

  // Section 1
  .pokemon-cover {
    display: flex;
    flex-direction: column;
    align-items: center;

    .pagination-buttons {
      position: absolute;
      top: 18%;
      width: 100%;

      .left-button, 
      .right-button {
        position: absolute;
        color: var(--color-white);
        cursor: pointer;
        font-size: $font-xs;
        border: 1px solid var(--color-white);
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
    .zoom-pokemon-button {
      position: absolute;
      top: 30%;
      right: $xs;
      color: #fff;
      font-size: $font-xs;
      border: 1px solid #fff;
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
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}

.loading-screen {
  height: 98vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
}
</style>
