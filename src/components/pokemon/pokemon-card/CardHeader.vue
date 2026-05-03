<template>
  <div class="white-bar">
    <div class="name-type-container">
      <!-- Name -->
      <h2 class="capitalize pokemon-name">
        {{ pokemon.name }}
      </h2>

      <!-- Type(s) -->
      <div class="type-container">
        <BaseTypeTag
          v-for="type in pokemon.types"
          :key="type.slot"
          :type="type.type.name"
          class="tag-item"
          @click="openTypeModal(type.type)"
        />
      </div>
    </div>

    <!-- Index #number -->
    <div class="index-number">
      #{{ getIndex(pokemonId) }}
    </div>
  </div>
</template>

<script>
import BaseTypeTag from "@/components/base/BaseTypeTag";
export default {
  name: 'CardHeader',
  components: {
    BaseTypeTag
  },
  props: {
    pokemon: {
      type: Object,
      requiered: true,
      default: () => {}
    },
    pokemonId: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    openTypeModal(type) {
      this.$emit('openTypeModal', type)
    },
    getIndex(value) {
      if (value < 10) {
        return "00" + value;
      } else if (value < 100) {
        return "0" + value;
      } else {
        return value;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.white-bar {
  position: relative;
  border-radius: $m $m 0 0;
  background: var(--color-bg-primary);
  width: 100%;
  height: $xxl;
  clip-path: polygon(100% 0, 100% 60%, 75% 60%, 60% 100%, 0 100%, 0 0);

  .name-type-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $s $m;

    .pokemon-name {
      color: var(--color-text);
      margin-right: $s;
      font-size: 1.4rem;
    }
    .type-container {
      display: flex;

      .tag-item:first-child {
        margin-right: $xs;
      }
    }
    .skeleton-block-line {
      background: var(--color-bg-tertiary);
      border-radius: $xxs;
      width: $xxxxl;
      height: $m;
    }
  }

  .index-number {
    position: absolute;
    top: 15%;
    right: 3%;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>