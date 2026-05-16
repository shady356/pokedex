<template>
  <div class="about-container">
    <!-- Description -->
    <section class="description-container">
      <h3 class="title">Description</h3>
      <p class="data-row">
        {{ pokemonSpecies.description.flavor_text }}
      </p>
      <div class="quote capitalize">
        – Pokémon {{ pokemonSpecies.description.version.name }}
      </div>
    </section>

    <!-- Abilities -->
    <section>
      <h3 class="title">Abilities</h3>

      <div class="abilities-container">
        <BaseTag
          v-for="item in pokemon.abilities"
          :key="item.ability.name"
          class="ability clickable"
          @click="$emit('openAbilityModal', item.ability)"
        >
          {{ item.ability.name }}
          <span v-if="item.is_hidden" class="material-icons icon">star</span>
        </BaseTag>
      </div>
    </section>

    <!-- Training -->
    <section>
      <h3 class="title">Training</h3>

      <div class="data-row">
        <div class="label">Growth rate</div>
        <div class="value capitalize">
          {{ pokemonSpecies.growthRate }}
        </div>
      </div>

      <div class="data-row">
        <div class="label">Catch rate</div>
        <div class="value">
          {{ pokemonSpecies.captureRate }}
        </div>
      </div>

      <div class="data-row">
        <div class="label">Base happiness</div>
        <div class="value">
          {{ pokemonSpecies.baseHappiness }}
        </div>
      </div>
    </section>

    <!-- Breeding -->
    <section>
      <h3 class="title">Breeding</h3>

      <div class="data-row">
        <div class="label">Egg Group</div>
        <div class="value capitalize">
          {{ formatEggGroups(pokemonSpecies.eggGroups) }}
        </div>
      </div>

      <div class="data-row">
        <div class="label">Hatch Counter</div>
        <div class="value">
          {{ pokemonSpecies.hatchCounter }}
        </div>
      </div>
    </section>

    <!-- Weight and height -->
    <section class="physique-container">
      <div class="weight">
        <span class="material-icons icon">fitness_center</span>
        {{ toKilogram(pokemon.weight) }}
      </div>

      <div class="height">
        <span class="material-icons icon">straighten</span>
        {{ toMeter(pokemon.height) }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseTag from "@/components/base/BaseTag.vue";

defineProps<{
  pokemon: Record<string, any>;
  pokemonSpecies: Record<string, any>;
}>();
defineEmits<{ openAbilityModal: [ability: { name: string }] }>();

function toMeter(value: number): string {
  return new Intl.NumberFormat("en-UK", {
    style: "unit",
    unit: "meter",
    unitDisplay: "short",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value / 10);
}

function toKilogram(value: number): string {
  return new Intl.NumberFormat("en-UK", {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "short",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value / 10);
}

function formatEggGroups(value: Array<{ name: string }>): string {
  return value.map((item) => item.name).join(", ");
}
</script>

<style lang="scss" scoped>
.about-container {
  padding-bottom: $space-48;

  section {
    padding: $space-16;

    .title {
      margin-bottom: $space-4;
      display: flex;
      align-items: center;
      font-size: $font-14;
    }

    .data-row {
      display: flex;
      padding: $space-4 0;
      font-size: $font-14;
      width: 100%;

      .label {
        flex-basis: 35%;
        padding-right: $space-12;
        color: var(--color-text-light);
      }
      .value {
        flex-basis: 65%;
        color: var(--color-text);
      }
    }

    &.description-container {
      background: var(--color-bg-primary);
      border-radius: $space-12;
      margin-bottom: $space-12;
      border: 1px solid var(--color-border);

      .quote {
        color: var(--color-text-light);
        font-size: $font-12;
        margin-top: $space-4;
        text-align: right;
      }
    }

    .abilities-container {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: $space-8;

      .ability {
        margin-right: $space-8;
        cursor: pointer;

        .icon {
          margin-left: $space-2;
          font-size: $font-8;
          color: var(--color-accent);
        }

        &.clickable:hover {
          opacity: 0.75;
        }
      }
    }

    &.physique-container {
      display: flex;
      justify-content: space-evenly;

      .weight {
        display: flex;
        align-items: center;

        .icon {
          color: var(--color-primary);
          font-size: $font-12;
          margin-right: $space-4;
        }
      }
      .height {
        display: flex;
        align-items: center;

        .icon {
          font-size: $font-12;
          color: var(--color-primary);
          margin-right: $space-4;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
