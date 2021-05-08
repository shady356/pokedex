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
          <td class="effect">
            {{ item.category }}
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
    }
  },
  methods: {
    getTypeColor(type) {
      switch (type) {
        case "bug":
          return "#92BC2C";
        case "dark":
          return "#595761";
        case "dragon":
          return "#0C69C8";
        case "electric":
          return "#F2D94E";
        case "fire":
          return "#FBA54C";
        case "fairy":
          return "#EE90E6";
        case "fighting":
          return "#D3425F";
        case "flying":
          return "#A1BBEC";
        case "ghost":
          return "#5F6DBC";
        case "grass":
          return "#5FBD58";
        case "ground":
          return "#DA7C4D";
        case "ice":
          return "#75D0C1";
        case "normal":
          return "#A0A29F";
        case "poison":
          return "#B763CF";
        case "psychic":
          return "#FA8581";
        case "rock":
          return "#C9BB8A";
        case "steel":
          return "#5695A3";
        case "water":
          return "#539DDF";
      }
    },
    getIcon(name) {
      return require("@/assets/icons/types/" + name + ".svg");
    },
    isSameType (type) {
      return this.types.includes(type)
    }
  }
};
</script>

<style lang="scss" scoped>
  .move-type-header {
    background: #fff;
    height: $m;
    padding: $xs 0 0;
    position: sticky;
    top: 0;
    width: 100%;

    .text {
      color: #666;
      font-weight: 400;
      font-size: $font-s;
      text-align: center;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: $m;

    .table-header {
      background: #fff;
      position: sticky;
      top: calc(#{$m} + #{$xs});
    }

    thead {

      th {
        padding: $s 0;
        text-align: left;
        font-size: $font-s;

        &:nth-child(4), &:nth-child(5) {
          text-align: right;
        }
      }
    }
    tbody {
      tr {
        border-top: 1px solid #eee;

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
              color: #666;
              font-size: $font-s;
              font-weight: normal;
            }
          }
          &.number {
            text-align: right;
          }
        }
      }
    }
  }

  .dark {
    .title {
      .text {
        background: #333;
      }
      &::after {
        content: '';
        background: #444;
      }
    }
    tbody {
      tr {
        border-color: #444;
      }
    }
  }
</style>