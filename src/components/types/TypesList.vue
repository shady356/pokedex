<template>
  <div v-if="types">
    <div class="types-container">
      <div
        class="type"
        v-for="type in types"
        :key="type.name"
        @click="selectType(type.name)"
      >
        <div 
          class="type-icon-container"
          :style="getTypeBackground(type.color)"
        >
          <img
            class="type-icon"
            :src="getTypeIcon(type.name)" 
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
      return require("@/assets/icons/types/" + name + ".svg");
    },
    selectType (typeName) {
      this.$emit('select-type', typeName)
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
      margin-bottom: $xl;

      .type-icon-container {
        margin-bottom: $xs;
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

  .dark {
    .type-name {
      color: #fff;
    }
  }
</style>