<template>
  <div>
    <h4 class="title capitalize">
      {{ title }}
    </h4>
    <table>
      <thead>
        <th
          class="uppercase"
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
          <td class="name">
            {{ item.name }}
          </td>
          <td class="type">
            {{ item.type }}
          </td>
          <td class="effect">
            {{ item.category }}
          </td>
          <td
            class="level number"
            v-if="isLevelUp"
          >
            {{ item.level }}
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
export default {
  name: "BaseMoveTable",
  filters: {
    accuracy(value) {
      if (value !== null) {
        return value + "%";
      } else {
        return "-";
      }
    },
    power(value) {
      if (value !== null) {
        return value;
      } else {
        return "-";
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
    }
  },
  computed: {
    isLevelUp() {
      return this.category === "levelUp";
    }
  }
};
</script>

<style lang="scss" scoped>
  .title {
    margin: $m 0 $s;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: $m;
    thead {
      th {
        padding: $s 0;
        text-align: left;
        font-size: $font-s;
      }
    }
    tbody {
      tr {
        border-top: 1px solid #eee;

        td {
          padding: $xs 0;
          text-transform: capitalize;

          &.number {
            text-align: right;
          }
        }
      }
    }
  }
</style>