<template>
  <div v-if="types">
    <div class="types-container">
      <div
        class="type"
        v-for="type in types"
        :key="type.name"
      >
        <div 
          class="type-icon-container"
          :style="getTypeBackground(type.color)"
        >
          <img
            class="type-icon"
            :src="fire" 
            alt="type-icon"
          >
        </div>
        <div class="type-name uppercase">
          {{ type.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $getAllTypes } from '@/helpers/types.js'
export default {
  name: 'TypesList',
  data () {
    return {
      types: null,
      fire: require('@/assets/icons/types/fire.svg')
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
      const imagePath = require(`@/assets/icons/types/${name}.svg`)
      return imagePath
    }
  }
}
</script>

<style lang="scss" scoped>
  .types-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .type {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100% /3);
      margin-bottom: $xxl;

      .type-icon-container {
        margin-bottom: $m;
        width: $m;
        height: $m;
        padding: $s;
        border-radius: 50%;

        .type-icon {
          width: 100%;
          height: 100%;
        }
      }

      .type-name {
        text-align: center;
        font-weight: 700;
      }
    }
  }
</style>