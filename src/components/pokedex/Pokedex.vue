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
          tag="li"
          :to="{
            name: 'PokemonCardController',
            params: {
              pokemonId: pokemon.id,
              pokemonIndex: index,
            },
          }"
        >
          <PokedexItem :pokemon="pokemon" />
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
      @closeModal="closeFilter"
    >
      <FilterPokemon :is-filter="isFilter" @applyFilters="updateFilters" />
    </BaseModal>

    <div v-if="isPokemonModal">
      <router-view :pokedex-ids="pokedexIds" />
    </div>
  </div>
</template>

<script>
import { $filterData } from "@/helpers/pokedexFilters.js";
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";
import FilterPokemon from "@/components/pokedex/FilterPokemon.vue";
import Header from "@/components/layout/Header.vue";
import PokedexItem from "@/components/pokedex/PokedexItem";
import { useQueryClient, STALE } from "@/composables/usePokeApi.js";
import { fetchPokemonForm } from "@/service/pokeApi.js";

export default {
  name: "Pokedex",
  components: {
    BaseButtonIcon,
    Header,
    BaseModal,
    BaseProgressSpinner,
    FilterPokemon,
    PokedexItem,
  },
  setup() {
    return { queryClient: useQueryClient() };
  },
  data() {
    return {
      pokemonList: [],
      visibleCount: 0,
      fetchedCount: 0,
      batchSize: 24,
      isLoadingBatch: false,

      isFilterOpen: false,
      isPokemonModal: false,
      scrollPosition: 0,
      filters: { generations: [], types: [] },
      isFilter: false,
    };
  },
  computed: {
    visiblePokemon() {
      return this.pokemonList.slice(0, this.visibleCount);
    },
    pokedexIds() {
      return this.pokemonList.map((p) => p.id);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal) {
          if (oldVal.name === "Pokedex") {
            this.scrollPosition = window.scrollY;
          } else {
            let scrollY = this.scrollPosition;
            setTimeout(() => {
              window.scroll(0, scrollY);
            }, 10);
          }
        }
        this.isPokemonModal = !!newVal?.meta?.showModal;
      },
    },
  },
  mounted() {
    this.setPokedexMap(this.filters);
  },
  beforeDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  },
  methods: {
    async fetchPokemon(id, index) {
      const data = await this.queryClient.fetchQuery({
        queryKey: ["pokemon-form", id],
        queryFn: () => fetchPokemonForm(id),
        staleTime: STALE,
      });
      this.$set(this.pokemonList, index, {
        id: data.id,
        name: data.name,
        types: data.types,
      });
      this.fetchedCount++;
    },

    async loadNextBatch() {
      if (this.isLoadingBatch) return;
      const start = this.visibleCount;
      const end = Math.min(start + this.batchSize, this.pokemonList.length);
      if (start >= end) return;

      this.isLoadingBatch = true;
      this.visibleCount = end;

      await Promise.all(
        Array.from({ length: end - start }, (_, i) =>
          this.fetchPokemon(this.pokemonList[start + i].id, start + i)
        )
      );

      this.isLoadingBatch = false;

      await this.$nextTick();
      const rect = this.$refs.trigger?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight) {
        this.loadNextBatch();
      }
    },

    scrollTrigger() {
      if (this._observer) this._observer.disconnect();
      this._observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) this.loadNextBatch();
      });
      this.$nextTick(() => {
        if (this.$refs.trigger) this._observer.observe(this.$refs.trigger);
      });
    },

    async setPokedexMap(filters) {
      this.pokemonList = [];
      this.visibleCount = 0;
      this.fetchedCount = 0;
      this.isLoadingBatch = false;
      this.pokemonList = await $filterData(filters);
      this.scrollTrigger();
    },

    openFilter() {
      this.isFilterOpen = true;
    },
    closeFilter() {
      this.isFilterOpen = false;
    },

    async updateFilters(filters) {
      this.isFilter = Object.values(filters).some((f) => f.length > 0);
      document.body.classList.toggle("bodyFilter", this.isFilter);
      this.closeFilter();
      await this.setPokedexMap(filters);
    },
  },
};
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
