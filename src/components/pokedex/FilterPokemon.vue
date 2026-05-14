<template>
  <div>
    <div class="header">
      <div class="header__title">Filter Pokémon</div>
    </div>

    <div class="filter-container">
      <ul class="filter-list">
        <li
          v-for="(filter, index) in filters"
          :key="filter.name"
          class="filter"
          @click="openFilter(index)"
        >
          <div :class="['text capitalize', { open: filter.open }]">
            {{ filter.name }}
          </div>

          <div
            v-if="filter.children.length > 0 && filter.open"
            class="children-list"
          >
            <BaseTag
              v-for="(child, childIndex) in filter.children"
              :key="childIndex"
              :class="['child', { primary: child.active }]"
              @click="setFilter(child)"
            >
              {{ child.name }}
            </BaseTag>
          </div>
        </li>
      </ul>

      <BaseButton class="primary" @click="applyFilters()">
        Apply filters
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GENERATIONS } from "@/helpers/pokedexFilters";
import { $getAllTypes } from "@/helpers/types";
import BaseTag from "@/components/base/BaseTag.vue";
import BaseButton from "@/components/base/BaseButton.vue";

interface FilterChild {
  name: string;
  active: boolean;
}

interface Filter {
  name: string;
  open: boolean;
  children: FilterChild[];
}

const emit = defineEmits<{
  applyFilters: [filters: Record<string, string[]>];
}>();

const filters = ref<Filter[]>([
  {
    name: "generations",
    open: true,
    children: GENERATIONS.map((g) => ({ name: g.name, active: false })),
  },
  {
    name: "types",
    open: false,
    children: $getAllTypes().map((t) => ({ name: t.name, active: false })),
  },
]);

function openFilter(index: number) {
  filters.value.forEach((f) => {
    f.open = false;
  });
  filters.value[index].open = true;
}

function setFilter(child: FilterChild) {
  child.active = !child.active;
}

function getActiveFilters(): Record<string, string[]> {
  const activeFilters: Record<string, string[]> = {};
  filters.value.forEach((filter) => {
    activeFilters[filter.name] = filter.children
      .filter((child) => child.active)
      .map((child) => child.name);
  });
  return activeFilters;
}

function applyFilters() {
  emit("applyFilters", getActiveFilters());
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space-24 $space-24;
  border-bottom: 1px solid var(--color-bg-secondary);

  &__title {
    @include title;
  }
  &__filter-icon {
    width: 24px;
    height: 24px;
  }
  &__filter-text-all {
    @include small-caps;
    @include micro-label;
    text-align: center;
  }
  &__filter-text-filtered-number {
    @include small-caps;
    @include micro-label;
    text-align: center;
  }
}

.filter-container {
  padding: $space-24;

  .filter-list {
    margin-bottom: $space-32;

    .filter {
      border-bottom: 1px solid var(--color-bg-secondary);
      padding: $space-12 0;

      .text {
        &.open {
          font-weight: 700;
        }
      }

      .children-list {
        padding: $space-8;
        display: flex;
        flex-wrap: wrap;

        .child {
          margin: $space-8 $space-4;
        }
      }
    }
  }
}
</style>
