<template>
  <div class="white-bar">
    <div class="name-type-container">
      <h2 class="capitalize pokemon-name">
        {{ pokemon.name }}
      </h2>
    </div>

    <div class="index-number">
      #{{ getIndex(pokemonId) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
      default: () => {}
    },
    pokemonId: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
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
  border-radius: $space-16 $space-16 0 0;
  background: var(--color-bg-primary);
  width: 100%;
  clip-path: polygon(100% 0, 100% 60%, 75% 60%, 60% 100%, 0 100%, 0 0);

  .name-type-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: $space-8 $space-16;

    .pokemon-name {
      color: var(--color-text);
      margin-right: $space-12;
      font-size: 1.4rem;
    }

    .skeleton-block-line {
      background: var(--color-bg-tertiary);
      border-radius: $space-4;
      width: $space-96;
      height: $space-16;
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