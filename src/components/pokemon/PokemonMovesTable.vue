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
          class="uppercase table-header"
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <td :class="['name', {'is-same-type': isSameType(item.type)}]">
            {{ item.name }}
            <div 
              v-if="isLevelUp"
              class="level"
            >
              Level {{ item.level }}
            </div>
          </td>
          <td class="type">
            <BaseTypeTag
              :type="item.type"
              class="tag-item"
            />
          </td>
          <td
            class="category"
            :title="item.category"
          >
            <img
              class="category-img"
              :src="getItemCategoryImageSrc(item.category)"
              :alt="item.category"
            >
          </td>
          <td class="power number">
            {{ item.power | power }}
          </td>
          <td class="accuracy number">
            {{ item.accuracy | accuracy }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BaseTypeTag from "@/components/base/BaseTypeTag";
import { $getTypeColor } from "@/helpers/types.js";
import moveSpecial from "@/assets/icons/move_types/move-special.png";
import movePhysical from "@/assets/icons/move_types/move-physical.png";
import moveStatus from "@/assets/icons/move_types/move-status.png";
export default {
  name: "BaseMoveTable",
  components: {
    BaseTypeTag
  },
  filters: {
    accuracy(value) {
      if (value !== null) {
        return value + "%";
      } else {
        return "–";
      }
    },
    power(value) {
      if (value !== null) {
        return value;
      } else {
        return "–";
      }
    }
  },
  data() {
    return {};
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    types: {
      type: Array,
      required: true
    }
  },
  computed: {
    isLevelUp() {
      return this.category === "levelUp";
    },
  },
  methods: {
    getTypeColor(type) {
      return $getTypeColor(type)
    },
    isSameType (type) {
      return this.types.includes(type)
    },
    getItemCategoryImageSrc(category) {
      if (category === 'special') return moveSpecial
      if (category === 'physical') return movePhysical
      return moveStatus
    }
  }
};
</script>

<style lang="scss" scoped>
  .move-type-header {
    background: var(--color-bg-primary);
    height: $m;
    padding: $xs 0 0;
    position: sticky;
    top: 0;
    width: 100%;

    .text {
      color: var(--color-text-light);
      font-weight: 400;
      font-size: $font-s;
      text-align: center;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: $xxl;

    .table-header {
      background: var(--color-bg-primary);
      position: sticky;
      top: calc(#{$m} + #{$xs});
    }

    thead {

      th {
        padding: $s 0;
        text-align: left;
        font-size: $font-xs;

        &:nth-child(2), &:nth-child(3) {
          text-align: center;
        }
        &:nth-child(4), &:nth-child(5) {
          text-align: right;
        }
      }
    }
    tbody {
      tr {
        border-top: 1px solid var(--color-bg-secondary);

        td {
          padding: $s 0;
          text-transform: capitalize;
          font-size: 14px;
          
          &.name {
            &.is-same-type {
              font-weight: bold;
            }
            .level {
              margin-top: $xxs;
              color: var(--color-text-light);
              font-size: $font-s;
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
              width: $xl;
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