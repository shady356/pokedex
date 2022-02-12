<template>
  <div class="about-container">
    <!-- Description -->
    <section class="description-container">
      <h6 class="title">
        Description foobar
      </h6>
      <p class="data-row">
        {{ pokemonSpecies.description.flavor_text }}
      </p>
      <div class="quote capitalize">
        – Pokémon {{ pokemonSpecies.description.version.name }}
      </div>
    </section>

    <!-- Abilities -->
    <section>
      <h6 class="title">
        Abilities
      </h6>

      <div class="abilities-container">
        <BaseTag
          v-for="item in pokemon.abilities"
          :key="item.ability.name"
          class="ability"
        >
          {{ item.ability.name }}
          <fa-icon
            v-if="item.is_hidden"
            icon="star"
            class="icon"
          />
        </BaseTag>
      </div>
    </section>

    <!-- Training -->
    <section>
      <h6 class="title">
        Training
      </h6>

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
      <h6 class="title">
        Breeding
      </h6>

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
        <fa-icon
          class="icon"
          icon="weight-hanging"
        />
        {{ pokemon.weight | toKilogram }}
      </div>

      <div class="height">
        <fa-icon
          class="icon"
          icon="ruler-vertical"
        />
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
      }

      .data-row {
        display: flex;
        padding: $xxs 0;
        font-size: $font-s;
        width: 100%;

        .label {
          flex-basis: 35%;
          padding-right: $s;
          color: #777;
        }
        .value {
          flex-basis: 65%;
          color: #111;
        }
      }

      &.description-container {
        background: #fff;
        border-radius: $s;
        margin-bottom: $s;
        filter: drop-shadow(0 2px 2px #00000022);

        .quote {
          color: #777;
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

          .icon {
            margin-left: $xxxs;
            height: $xs;
            color: #6dc;
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
            color: #6dc;
            height: $s;
            margin-right: $xxs;
          }
        }
        .height {
          display: flex;
          align-items: center;

          .icon {
            height: $s;
            color: #6dc;
            margin-right: $xxs;
            transform: scale(-1);
          }
        }
      }
    }
  }
  .dark {
    .about-container {
      .data-row {
        .label {
          color: #aaa;
        }
        .value {
          color: #ddd;
        }
      }
      .description-container {
        background: #333;

        .quote {
          color: #aaa;
        }
      }
    }
  }
</style>