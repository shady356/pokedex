<template>
  <div class="top-bar">
    <div class="name-type-container">
      <h2 class="capitalize pokemon-name">
        {{ pokemonName }}
      </h2>
    </div>

    <div class="index-number">
      #{{ pokemonIdIndex }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  pokemonId: number;
  pokemonName: string;
}>();

const pokemonIdIndex = computed(() => {
  const n = props.pokemonId;
  if (n < 10) return "000" + n;
  if (n < 100) return "00" + n;
  return "0" + n;
});


</script>

<style lang="scss" scoped>
.top-bar {
  position: relative;
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
    font-size: $font-14;
    font-weight: 600;
  }
}
</style>
