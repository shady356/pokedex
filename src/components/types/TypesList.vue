<template>
  <ul
    v-if="types"
    class="type-list"
  >
    <li
      class="type-item"
      v-for="type in types"
      :key="type.name"
      @click="selectType(type.name)"
    >
      <div 
        class="type-item__icon"
        :style="getTypeBackground(type.color)"
      >
        <img
          class="type-item__icon-image"
          :src="getTypeIcon(type.name)" 
          alt="type-icon"
        >
      </div>
      <div class="type-item__title uppercase">
        {{ type.name }}
      </div>
    </li>
  </ul>
</template>

<script>
import { $getAllTypes } from '@/helpers/types.js'
export default {
  name: 'TypesList',
  data () {
    return {
      types: null,
    }
  },
  mounted() {
    this.types = $getAllTypes()
  },
  methods: {
    getTypeBackground (color) {
      return {
        'background-color': color 
      }
    },
    getTypeIcon (name) {
      return require("@/assets/icons/types/" + name + ".svg");
    },
    selectType (typeName) {
      this.$emit('select-type', typeName)
    }
  }
}
</script>

<style lang="scss" scoped>
  .type-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $s;

    .type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff66;
      width: 30%;
      padding: $s;
      margin-bottom: $s;
      box-sizing: border-box;
      border-radius: $s;

      &__icon {
        margin-bottom: $xs;
        width: $m;
        height: $m;
        padding: $s;
        border-radius: 50%;
      }
      &__icon-image {
        width: 100%;
        height: 100%;
      }
      &__title {
        text-align: center;
        font-weight: 700;
      }
    }
  }
</style>