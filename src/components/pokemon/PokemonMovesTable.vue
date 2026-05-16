<template>
  <div>
    <div class="move-type-header">
      <div class="text uppercase letter-spacing">
        {{ title }}
      </div>
    </div>
    <table>
      <thead>
        <th
          v-for="header in headers"
          :key="header"
          class="uppercase table-header"
        >
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            :class="[
              'name',
              { 'is-same-type': item.type && isSameType(item.type) },
            ]"
          >
            {{ item.name }}
            <div v-if="isLevelUp" class="level">Level {{ item.level }}</div>
          </td>
          <td class="type">
            <BaseTypeTag
              :type="item.type as PokemonTypeName"
              class="tag-item"
            />
          </td>
          <td class="category" :title="item.category">
            <img
              class="category-img"
              :src="getItemCategoryImageSrc(item.category)"
              :alt="item.category"
            />
          </td>
          <td class="power number">
            {{ formatPower(item.power) }}
          </td>
          <td class="accuracy number">
            {{ formatAccuracy(item.accuracy) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseTypeTag from "@/components/base/BaseTypeTag.vue";
import type { PokemonTypeName } from "@/helpers/types";
import moveSpecial from "@/assets/icons/move_types/move-special.png";
import movePhysical from "@/assets/icons/move_types/move-physical.png";
import moveStatus from "@/assets/icons/move_types/move-status.png";

interface MoveItem {
  name: string;
  type: string | undefined;
  category: string | undefined;
  power: number | null;
  accuracy: number | null;
  level?: number;
}

const props = defineProps<{
  headers: string[];
  items: MoveItem[];
  title: string;
  category: string;
  types: string[];
}>();

const isLevelUp = computed(() => props.category === "levelUp");

function isSameType(type: string): boolean {
  return props.types.includes(type);
}

function getItemCategoryImageSrc(category: string | undefined): string {
  if (category === "special") return moveSpecial;
  if (category === "physical") return movePhysical;
  return moveStatus;
}

function formatPower(value: number | null): string {
  return value !== null ? String(value) : "–";
}

function formatAccuracy(value: number | null): string {
  return value !== null ? value + "%" : "–";
}
</script>

<style lang="scss" scoped>
.move-type-header {
  background: var(--color-bg-primary);
  height: $space-16;
  padding: $space-8 0 0;
  position: sticky;
  top: 0;
  width: 100%;

  .text {
    color: var(--color-text-light);
    font-weight: 400;
    font-size: $font-14;
    text-align: center;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: $space-48;

  .table-header {
    background: var(--color-bg-primary);
    position: sticky;
    top: calc(#{$space-16} + #{$space-8});
  }

  thead {
    th {
      padding: $space-12 0;
      text-align: left;
      font-size: $font-12;

      &:nth-child(2),
      &:nth-child(3) {
        text-align: center;
      }
      &:nth-child(4),
      &:nth-child(5) {
        text-align: right;
      }
    }
  }
  tbody {
    tr {
      border-top: 1px solid var(--color-border);

      td {
        padding: $space-12 0;
        text-transform: capitalize;
        font-size: $font-14;

        &.name {
          &.is-same-type {
            font-weight: bold;
          }
          .level {
            margin-top: $space-4;
            color: var(--color-text-light);
            font-size: $font-14;
            font-weight: normal;
          }
        }
        &.type {
          text-align: center;
        }
        &.category {
          text-align: center;
          .category-img {
            height: auto;
            width: $space-32;
          }
        }
        &.number {
          text-align: right;
        }
      }
    }
  }
}
</style>
