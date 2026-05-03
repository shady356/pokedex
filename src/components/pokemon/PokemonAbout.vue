<template>
  <div class="about-container">
    <!-- Description -->
    <section class="description-container">
      <h3 class="title">
        Description
      </h3>
      <p class="data-row">
        {{ pokemonSpecies.description.flavor_text }}
      </p>
      <div class="quote capitalize">
        – Pokémon {{ pokemonSpecies.description.version.name }}
      </div>
    </section>

    <!-- Abilities -->
    <section>
      <h3 class="title">
        Abilities
      </h3>

      <div class="abilities-container">
        <BaseTag
          v-for="item in pokemon.abilities"
          :key="item.ability.name"
          class="ability clickable"
          @click.native="$emit('openAbilityModal', item.ability)"
        >
          {{ item.ability.name }}
          <span
            v-if="item.is_hidden"
            class="material-icons icon"
          >star</span>
        </BaseTag>
      </div>
    </section>

    <!-- Training -->
    <section>
      <h3 class="title">
        Training
      </h3>

      <div class="data-row">
        <div class="label">
          Growth rate
        </div>
        <div class="value capitalize">
          {{ pokemonSpecies.growthRate }}
        </div>
      </div>

      <div class="data-row">
        <div class="label">
          Catch rate
        </div>
        <div class="value">
          {{ pokemonSpecies.captureRate }}
        </div>
      </div>

      <div class="data-row">
        <div class="label">
          Base happiness
        </div>
        <div class="value">
          {{ pokemonSpecies.baseHappiness }}
        </div>
      </div>
    </section>

    <!-- Breeding -->
    <section>
      <h3 class="title">
        Breeding
      </h3>

      <!-- Egg group -->
      <div class="data-row">
        <div class="label">
          Egg Group
        </div>
        <div class="value capitalize">
          {{ pokemonSpecies.eggGroups | eggGroups }}
        </div>
      </div>

      <!-- Hatch counter -->
      <div class="data-row">
        <div class="label">
          Hatch Counter
        </div>
        <div class="value">
          {{ pokemonSpecies.hatchCounter }}
        </div>
      </div>
    </section>

    <!-- Weight and height -->
    <section class="physique-container">
      <div class="weight">
        <span class="material-icons icon">fitness_center</span>
        {{ pokemon.weight | toKilogram }}
      </div>

      <div class="height">
        <span class="material-icons icon">straighten</span>
        {{ pokemon.height | toMeter }}
      </div>
    </section>
  </div>
</template>

<script>
import BaseTag from "@/components/base/BaseTag.vue";
export default {
  name: "PokemonAbout",
  components: {
    BaseTag
  },
  filters: {
    toMeter(value) {
      value /= 10;
      return new Intl.NumberFormat("en-UK", {
        style: "unit",
        unit: "meter",
        unitDisplay: "short",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2
      }).format(value);
    },
    toKilogram(value) {
      value /= 10;
      return new Intl.NumberFormat("en-UK", {
        style: "unit",
        unit: "kilogram",
        unitDisplay: "short",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2
      }).format(value);
    },
    eggGroups(value) {
      let eggs = "";
      value.forEach((item, index) => {
        if (index === value.length - 1) {
          eggs += item.name;
        } else {
          eggs += item.name + ", ";
        }
      });
      return eggs;
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    pokemonSpecies: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .about-container {
    padding-bottom: $xxl;

    section {
      padding: $m;

      .title {
        margin-bottom: $xxs;
        display: flex;
        align-items: center;
        font-size: 14px;
      }

      .data-row {
        display: flex;
        padding: $xxs 0;
        font-size: $font-s;
        width: 100%;

        .label {
          flex-basis: 35%;
          padding-right: $s;
          color: var(--color-text-light);
        }
        .value {
          flex-basis: 65%;
          color: var(--color-text);
        }
      }

      &.description-container {
        background: var(--color-bg-primary);
        border-radius: $s;
        margin-bottom: $s;
        border: 1px solid var(--color-border);

        .quote {
          color: var(--color-text-light);
          font-size: $font-xs;
          margin-top: $xxs;
          text-align: right;
        }
      }

      .abilities-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: $xs;

        .ability {
          margin-right: $xs;
          cursor: pointer;

          .icon {
            margin-left: $xxxs;
            font-size: $xs;
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
            font-size: $s;
            margin-right: $xxs;
          }
        }
        .height {
          display: flex;
          align-items: center;

          .icon {
            font-size: $s;
            color: var(--color-primary);
            margin-right: $xxs;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
</style>