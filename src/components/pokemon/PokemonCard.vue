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

<script setup lang="ts">
import { ref, computed, toRef, markRaw, onMounted, onBeforeUnmount } from "vue";
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

const props = withDefaults(
  defineProps<{
    pokemonId: number | string;
    pokemonIndex?: number;
    isFirstPokemon: boolean;
    isLastPokemon: boolean;
  }>(),
  { pokemonIndex: 0 },
);
const emit = defineEmits<{ "paginate-pokemon": [direction: string] }>();

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

const offloadSprite = pokemonQuery.isFetching;

const isPokemonZoom = ref(false);
const startTouch = ref(0);
const toPositionPercentage = ref(0);
const slideDirection = ref("");
const clientWidth = ref(0);
const isDark = ref(false);
const isAbilityModalOpen = ref(false);
const currentAbilityInModal = ref<string | null>(null);
const metaItems = ref([
  { name: "about", active: true },
  { name: "moves", active: false },
]);

let _resetTimer: ReturnType<typeof setTimeout> | undefined;
let _themeObserver: MutationObserver | null = null;

const firstType = computed(() => {
  const type = pokemon.value!.types.find((t: any) => t.slot === 1);
  return type?.type.name ?? "";
});

const pokemonTexture = computed(
  () => textures[`/src/assets/PK_Textures/${firstType.value}.png`],
);

const isPokemonLoaded = computed(
  () => !!(pokemon.value && pokemonSpecies.value),
);

const pokemonTypes = computed(() =>
  pokemon.value!.types.map((t: any) => t.type.name),
);

const getModalBackground = computed(() => {
  const gradient = getTypeGradients(isDark.value)[
    firstType.value as PokemonTypeName
  ];
  return {
    backgroundImage: `url(${pokemonTexture.value}), ${gradient}`,
    backgroundBlendMode: "overlay, normal",
    backgroundSize: "cover, cover",
  };
});

onMounted(() => {
  clientWidth.value = document.documentElement.clientWidth;
  isDark.value = resolveIsDark();
  _themeObserver = markRaw(
    new MutationObserver(() => {
      isDark.value = resolveIsDark();
    }),
  );
  _themeObserver.observe(document.documentElement, {
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  _themeObserver?.disconnect();
});

function resolveIsDark(): boolean {
  const cl = document.documentElement.classList;
  if (cl.contains("theme-dark")) return true;
  if (cl.contains("theme-light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function changeMetaTab(index: number) {
  metaItems.value.forEach((tab) => (tab.active = false));
  metaItems.value[index].active = true;
}

function openAbilityModal(ability: { name: string }) {
  currentAbilityInModal.value = ability.name;
  isAbilityModalOpen.value = true;
}

function closeAbilityModal() {
  isAbilityModalOpen.value = false;
}

function startHandler(e: TouchEvent) {
  clearTimeout(_resetTimer);
  if (!e.changedTouches || e.changedTouches.length === 0) return;
  startTouch.value = e.changedTouches[0].clientX;
}

function movePokemon(e: TouchEvent) {
  if (!e.changedTouches || e.changedTouches.length === 0) return;
  const moveTouch = e.changedTouches[0].clientX;
  const moving = Math.ceil(((moveTouch / clientWidth.value) * 100 - 50) * 2.5);
  const startPosition = Math.ceil(
    ((startTouch.value / clientWidth.value) * 100 - 50) * 2.5,
  );
  toPositionPercentage.value = calcMovingPercentage(moving, startPosition);
  const pokemonSprite = document.getElementById("pokemon-sprite-id");
  if (pokemonSprite)
    pokemonSprite.style.transform = `translateX(${toPositionPercentage.value}%)`;
}

function calcMovingPercentage(moving: number, startPosition: number): number {
  const screenCenter = clientWidth.value / 2;
  if (startTouch.value > screenCenter) return moving - startPosition;
  if (startTouch.value < screenCenter) return (startPosition - moving) * -1;
  return moving;
}

function endHandler() {
  const percentageThreshold = 50;
  if (toPositionPercentage.value !== 0) {
    if (
      toPositionPercentage.value < -percentageThreshold &&
      !props.isLastPokemon
    ) {
      paginatePokemon("next");
    } else if (
      toPositionPercentage.value > percentageThreshold &&
      !props.isFirstPokemon
    ) {
      paginatePokemon("previous");
    } else {
      const spriteEl = document.getElementById("pokemon-sprite-id");
      if (spriteEl) {
        spriteEl.style.cssText = "transition: transform .4s ease";
        spriteEl.style.transform = "translateX(0%)";
        _resetTimer = setTimeout(() => {
          spriteEl.style.cssText = "transition: none";
        }, 400);
      }
    }
  }
  toPositionPercentage.value = 0;
}

function paginatePokemon(direction: string) {
  slideDirection.value = direction === "next" ? "slide-h-r" : "slide-h-l";
  emit("paginate-pokemon", direction);
}

function toggleZoom() {
  isPokemonZoom.value = !isPokemonZoom.value;
}
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
