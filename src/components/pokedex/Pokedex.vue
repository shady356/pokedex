<template>
  <div>
    <Header>
      <template #title>
        <h1>Pokédex</h1>
      </template>

      <template #options>
        <BaseButtonIcon @click="openFilter">
          <span
            :class="['material-icons-round filter-item', { active: isFilter }]"
            >filter_list</span
          >
        </BaseButtonIcon>
      </template>
    </Header>
    <div v-if="fetchedCount > 0" class="default-page-margin pokedex-container">
      <ul>
        <router-link
          v-for="(pokemon, index) in visiblePokemon"
          :key="pokemon.id"
          v-slot="{ navigate }"
          custom
          :to="{
            name: 'PokemonCardController',
            params: { pokemonId: pokemon.id },
            query: { i: index },
          }"
        >
          <li @click="navigate">
            <PokedexItem :pokemon="pokemon" />
          </li>
        </router-link>
      </ul>
    </div>
    <div v-else class="loading">
      <BaseProgressSpinner size="large" />
    </div>
    <div ref="trigger" class="trigger" />

    <!-- Filter -->
    <BaseModal
      v-if="isFilterOpen"
      :show-close-button="false"
      drag-handler
      @close-modal="closeFilter"
    >
      <FilterPokemon :is-filter="isFilter" @apply-filters="updateFilters" />
    </BaseModal>

    <div v-if="isPokemonModal">
      <router-view :pokedex-ids="pokedexIds" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import {
  $filterData,
  type Filters,
  type PokemonEntry,
} from "@/helpers/pokedexFilters";
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";
import FilterPokemon from "@/components/pokedex/FilterPokemon.vue";
import Header from "@/components/layout/Header.vue";
import PokedexItem from "@/components/pokedex/PokedexItem.vue";
import { useQueryClient, STALE } from "@/composables/usePokeApi";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
import { fetchPokemonForm } from "@/service/pokeApi";

const queryClient = useQueryClient();
const route = useRoute();

const pokemonList = ref<PokemonEntry[]>([]);
const fetchedCount = ref(0);
const isFilterOpen = ref(false);
const isPokemonModal = ref(false);
const scrollPosition = ref(0);
const filters = ref<Filters>({ generations: [], types: [] });
const isFilter = ref(false);
const trigger = shallowRef<Element | null>(null);

const { visibleCount, restart } = useInfiniteScroll(
  trigger,
  computed(() => pokemonList.value.length),
  24,
  async (start, end) => {
    await Promise.all(
      Array.from({ length: end - start }, (_, i) =>
        fetchPokemon(pokemonList.value[start + i].id, start + i),
      ),
    );
  },
);

const visiblePokemon = computed(() =>
  pokemonList.value.slice(0, visibleCount.value),
);
const pokedexIds = computed(() => pokemonList.value.map((p) => p.id));

watch(
  route,
  (newVal, oldVal) => {
    if (oldVal?.name === "Pokedex") {
      scrollPosition.value = window.scrollY;
    } else if (newVal?.name === "Pokedex" && oldVal) {
      const scrollY = scrollPosition.value;
      nextTick(() => window.scroll(0, scrollY));
    }
    isPokemonModal.value = !!newVal?.meta?.showModal;
  },
  { immediate: true },
);

onMounted(() => {
  setPokedexMap(filters.value);
});

async function fetchPokemon(id: number, index: number) {
  const data = await queryClient.fetchQuery({
    queryKey: ["pokemon-form", id],
    queryFn: () => fetchPokemonForm(id),
    staleTime: STALE,
  });
  pokemonList.value[index] = {
    id: data.id,
    name: data.name,
    types: data.types,
  };
  fetchedCount.value++;
}

async function setPokedexMap(newFilters: Filters) {
  pokemonList.value = [];
  fetchedCount.value = 0;
  pokemonList.value = await $filterData(newFilters);
  restart();
}

function openFilter() {
  isFilterOpen.value = true;
}

function closeFilter() {
  isFilterOpen.value = false;
}

async function updateFilters(newFilters: Record<string, string[]>) {
  isFilter.value = Object.values(newFilters).some((f) => f.length > 0);
  document.body.classList.toggle("bodyFilter", isFilter.value);
  closeFilter();
  await setPokedexMap(newFilters as unknown as Filters);
}
</script>

<style lang="scss" scoped>
$pokemon-per-row-mobile: 3;
$pokemon-gap-mobile: 2%;

.trigger {
  position: relative;
  height: 20vh;
  width: 100%;
}

.pokedex-container {
  display: flex;
  justify-content: center;

  ul {
    display: grid;
    gap: $space-12;
    width: 100%;

    grid-template-columns: repeat(4, 1fr);

    li {
      cursor: pointer;
      aspect-ratio: 1;
    }

    @media (min-width: 1024px) {
      width: 70%;
      grid-template-columns: repeat(6, 1fr);
    }
  }
}

.filter-item {
  &.active {
    color: var(--color-primary);
  }
}

.loading {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
