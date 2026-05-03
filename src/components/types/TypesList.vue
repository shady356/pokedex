<template>
  <ul
    v-if="types"
    class="type-list"
  >
    <li
      v-for="type in types"
      :key="type.name"
      class="type-item"
    >
      <button
        class="type-item__button"
        @click="selectType(type.name)"
      >
        <div
          class="type-item__icon"
          :style="getTypeBackground(type.color)"
        >
          <img
            class="type-item__icon-image"
            :src="getTypeIcon(type.name)"
            alt=""
          >
        </div>
        <div class="type-item__title uppercase">
          {{ type.name }}
        </div>
      </button>
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
      return new URL(`../../assets/icons/types/${name}.svg`, import.meta.url).href;
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
      width: 30%;
      margin-bottom: $s;

      &__button {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-accent-dim);
        width: 100%;
        padding: $s;
        box-sizing: border-box;
        border-radius: $s;
        border: none;
        cursor: pointer;
        color: inherit;
        font: inherit;
        -webkit-tap-highlight-color: transparent;
      }

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