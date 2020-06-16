<template>
  <div class="about-container">
    <!-- Description -->
    <section class="description-container">
      <h6 class="title">
        Description
      </h6>

      <p class="data-row">
        {{ pokemonSpecies.description.flavor_text }}
      </p>
      <div class="quote capitalize">
        – Pokémon {{ pokemonSpecies.description.version.name }}
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

    .quote {
      font-size: $font-xs;
      text-align: right;
      margin-top: $xxs;
      color: #777;
    }

    .data-row {
      display: flex;
      padding: 4px 0;
      font-size: $font-s;
      width: 100%;

      .label {
        flex-basis: 35%;
        padding-right: 10px;
        color: #777;
      }
      .value {
        flex-basis: 65%;
        color: #111;
      }
      
    }

    &.description-container {
      //border: 1px dashed #ddd;
      background: #fff;
      filter: drop-shadow(0 2px 2px #00000022);
      border-radius: $s;
    }
    &.physique-container {
      display: flex;
      justify-content: space-evenly;

      .weight {
        display: flex;
        align-items: center;

        .icon {
          color: #777;
          height: $s;
          margin-right: $xxs;
        }
      }
      .height {
        display: flex;
        align-items: center;

        .icon {
          height: $s;
          color: #777;
          margin-right: $xxs;
          transform: scale(-1);
        }
      }
    }
    .abilities-container {
      display: flex;
      flex-wrap: nowrap;
      overflow-x:auto;

      .ability {
        margin-right: 12px;

        .icon {
          margin-left: 4px;
          height: 8px;
          color: #777;
        }
      }
    }

  }
}
</style>