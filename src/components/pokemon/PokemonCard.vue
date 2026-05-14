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
        :class="['pokemon-cover section-1', { isZoom: isPokemonZoom }]"
        @touchstart.passive="startHandler"
        @touchmove.passive="movePokemon"
        @touchend="endHandler"
      >
        <CardHeader :pokemon="pokemon!" :pokemon-id="pokemonId" />
        <!-- Pagination buttons -->
        <div class="pagination-buttons">
          <BaseButtonIcon
            v-if="!isFirstPokemon"
            class="left-button"
            @click="paginatePokemon('previous')"
          >
            <span class="material-icons">chevron_left</span>
          </BaseButtonIcon>
          <BaseButtonIcon
            v-if="!isLastPokemon"
            class="right-button"
            @click="paginatePokemon('next')"
          >
            <span class="material-icons">chevron_right</span>
          </BaseButtonIcon>
        </div>
        <CardSprite
          :slide-direction="slideDirection"
          :pokemon-id="pokemonId"
          :offload-sprite="offloadSprite"
          :pokemon="pokemon!"
          :is-pokemon-zoom="isPokemonZoom"
        />
        <!-- Zoom on sprite button -->
        <BaseButtonIcon class="zoom-pokemon-button" @click="toggleZoom()">
          <span class="material-icons">{{
            isPokemonZoom ? "zoom_out" : "zoom_in"
          }}</span>
        </BaseButtonIcon>
      </section>

      <!-- Meta card container -->
      <transition name="slide-v" mode="out-in">
        <section v-if="!isPokemonZoom" class="meta-container section-2">
          <BaseTab
            class="tab-header"
            :items="metaItems"
            @change-tab="changeMetaTab"
          />

          <div class="tab-content">
            <transition name="fade" mode="out-in">
              <!-- About -->
              <div
                v-if="metaItems[0].active"
                key="tab-about"
                class="about-container"
              >
                <PokemonBaseStats :pokemon="pokemon!" />
                <PokemonAbout
                  :pokemon="pokemon!"
                  :pokemon-species="pokemonSpecies!"
                  @open-ability-modal="openAbilityModal"
                />
              </div>

              <!-- Moves -->
              <div v-else key="tab-moves" class="moves-container">
                <PokemonMoves
                  v-if="Number(pokemonId) <= 251"
                  :pokemon-id="pokemonId"
                  :types="pokemonTypes"
                />
                <div
                  v-else
                  style="
                    color: var(--color-text-disabled);
                    text-align: center;
                    padding: 60px 0;
                  "
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
    <div v-else class="loading-screen">
      <BaseProgressSpinner size="large" />
    </div>

    <!-- Ability modal -->
    <BaseModal v-if="isAbilityModalOpen" @close-modal="closeAbilityModal">
      <AbilityModal :ability-name="currentAbilityInModal ?? ''" />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, markRaw, type PropType } from "vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseTab from "@/components/base/BaseTab.vue";
import CardHeader from "@/components/pokemon/pokemon-card/CardHeader.vue";
import CardSprite from "@/components/pokemon/pokemon-card/CardSprite.vue";
import { usePokemon, usePokemonSpecies } from "@/composables/usePokeApi";
import { getTypeGradients } from "@/utils/typeGradients";
import PokemonAbout from "@/components/pokemon/PokemonAbout.vue";
import PokemonBaseStats from "@/components/pokemon/PokemonBaseStats.vue";
import PokemonMoves from "@/components/pokemon/PokemonMoves.vue";
import AbilityModal from "@/components/pokemon/AbilityModal.vue";
import type { PokemonTypeName } from "@/helpers/types";

const textures: Record<string, string> = import.meta.glob(
  "/src/assets/PK_Textures/*.png",
  { eager: true, import: "default" },
);

export default defineComponent({
  name: "PokemonCard",
  components: {
    BaseModal,
    BaseProgressSpinner,
    BaseButtonIcon,
    BaseTab,
    CardHeader,
    CardSprite,
    PokemonAbout,
    PokemonBaseStats,
    PokemonMoves,
    AbilityModal,
  },
  props: {
    pokemonId: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    pokemonIndex: {
      type: Number,
      default: 0,
    },
    isFirstPokemon: {
      type: Boolean,
      required: true,
    },
    isLastPokemon: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["paginate-pokemon"],
  setup(props) {
    const pokemonId = toRef(props, "pokemonId");
    const pokemonQuery = usePokemon(pokemonId);
    const speciesQuery = usePokemonSpecies(pokemonId);

    const pokemon = computed(() => {
      const d = pokemonQuery.data.value;
      if (!d) return null;
      return {
        id: d.id,
        name: d.name,
        sprite: d.sprites.front_default,
        abilities: d.abilities,
        stats: d.stats,
        types: d.types,
        weight: d.weight,
        height: d.height,
      };
    });

    const pokemonSpecies = computed(() => {
      const d = speciesQuery.data.value;
      if (!d) return null;
      const description = d.flavor_text_entries.find(
        (e: any) => e.language.name === "en",
      );
      return {
        eggGroups: d.egg_groups,
        description,
        captureRate: d.capture_rate,
        baseHappiness: d.base_happiness,
        growthRate: d.growth_rate.name,
        hatchCounter: d.hatch_counter,
      };
    });

    return { pokemon, pokemonSpecies, offloadSprite: pokemonQuery.isFetching };
  },
  data() {
    return {
      isPokemonZoom: false,
      startTouch: 0,
      toPositionPercentage: 0,
      movingGlobal: 0,
      slideDirection: "",
      clientWidth: 0,
      isDark: false,
      isAbilityModalOpen: false,
      currentAbilityInModal: null as string | null,
      _resetTimer: undefined as ReturnType<typeof setTimeout> | undefined,
      _themeObserver: null as MutationObserver | null,
      metaItems: [
        { name: "about", active: true },
        { name: "moves", active: false },
      ],
    };
  },
  computed: {
    pokemonTexture(): string {
      return textures[`/src/assets/PK_Textures/${this.firstType}.png`];
    },
    isPokemonLoaded(): boolean {
      return !!(this.pokemon && this.pokemonSpecies);
    },
    firstType(): string {
      const type = this.pokemon!.types.find((t: any) => t.slot === 1);
      return type?.type.name ?? "";
    },
    pokemonTypes(): string[] {
      return this.pokemon!.types.map((t: any) => t.type.name);
    },
    getModalBackground(): Record<string, string> {
      const gradient = getTypeGradients(this.isDark)[
        this.firstType as PokemonTypeName
      ];
      return {
        backgroundImage: `url(${this.pokemonTexture}), ${gradient}`,
        backgroundBlendMode: "overlay, normal",
        backgroundSize: "cover, cover",
      };
    },
  },
  mounted() {
    this.clientWidth = document.documentElement.clientWidth;
    this.isDark = this._resolveIsDark();
    this._themeObserver = markRaw(
      new MutationObserver(() => {
        this.isDark = this._resolveIsDark();
      }),
    );
    this._themeObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
    });
  },
  beforeUnmount() {
    this._themeObserver?.disconnect();
  },
  methods: {
    _resolveIsDark(): boolean {
      const cl = document.documentElement.classList;
      if (cl.contains("theme-dark")) return true;
      if (cl.contains("theme-light")) return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
    changeMetaTab(index: number) {
      this.metaItems.forEach((tab) => {
        tab.active = false;
      });
      this.metaItems[index].active = true;
    },
    openAbilityModal(ability: { name: string }) {
      this.currentAbilityInModal = ability.name;
      this.isAbilityModalOpen = true;
    },
    closeAbilityModal() {
      this.isAbilityModalOpen = false;
    },
    swipePokemon(direction: string) {
      if (direction === "right") this.paginatePokemon("previous");
      if (direction === "left") this.paginatePokemon("next");
    },
    startHandler(e: TouchEvent) {
      clearTimeout(this._resetTimer);
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      this.startTouch = e.changedTouches[0].clientX;
    },
    movePokemon(e: TouchEvent) {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const moveTouch = e.changedTouches[0].clientX;
      const moving = Math.ceil(
        ((moveTouch / this.clientWidth) * 100 - 50) * 2.5,
      );
      const startPosition = Math.ceil(
        ((this.startTouch / this.clientWidth) * 100 - 50) * 2.5,
      );
      this.toPositionPercentage = this.calcMovingPercentage(
        moving,
        startPosition,
      );
      const pokemonSprite = document.getElementById("pokemon-sprite-id");
      if (pokemonSprite)
        pokemonSprite.style.transform = `translateX(${this.toPositionPercentage}%)`;
    },
    calcMovingPercentage(moving: number, startPosition: number): number {
      const screenCenter = this.clientWidth / 2;
      if (this.startTouch > screenCenter) return moving - startPosition;
      if (this.startTouch < screenCenter) return (startPosition - moving) * -1;
      return moving;
    },
    endHandler() {
      const percentageThreshold = 50;
      if (this.toPositionPercentage !== 0) {
        if (
          this.toPositionPercentage < -percentageThreshold &&
          !this.isLastPokemon
        ) {
          this.paginatePokemon("next");
        } else if (
          this.toPositionPercentage > percentageThreshold &&
          !this.isFirstPokemon
        ) {
          this.paginatePokemon("previous");
        } else {
          const spriteEl = document.getElementById("pokemon-sprite-id");
          if (spriteEl) {
            spriteEl.style.cssText = "transition: transform .4s ease";
            spriteEl.style.transform = "translateX(0%)";
            this._resetTimer = setTimeout(() => {
              spriteEl.style.cssText = "transition: none";
            }, 400);
          }
        }
      }
      this.toPositionPercentage = 0;
    },
    paginatePokemon(direction: string) {
      this.slideDirection = direction === "next" ? "slide-h-r" : "slide-h-l";
      this.$emit("paginate-pokemon", direction);
    },
    toggleZoom() {
      this.isPokemonZoom = !this.isPokemonZoom;
    },
  },
});
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
        margin: 0 $space-8;
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
      top: 28%;
      right: $space-8;
    }
  }

  // Section 2
  .meta-container {
    border-radius: $space-12 $space-12 0 0;
    padding: $space-16;
    margin: 0 $space-8;
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
