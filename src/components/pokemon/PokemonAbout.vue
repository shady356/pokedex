<template>
  <div>
    <!-- Weight and height -->
    <section>
      <div class="physique-container">
        <div class="weight">
          <fa-icon class="icon" icon="weight-hanging"/>
          {{pokemon.weight}} lbs
        </div>
        <div class="height">
          <fa-icon class="icon" icon="ruler-vertical"/>
          {{pokemon.height}}"
        </div>
      </div>
    </section>

    <!-- Abilities -->
    <section>
      <div class="title">
        <h6 class="text">Abilities</h6>
      </div>
      <div class="abilities-container">
        <BaseTag
          v-for="item in pokemon.abilities"
          :key="item.ability.name"
          class="ability"
        >
          {{item.ability.name}}
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
      <div class="title">
        <fa-icon icon="star" class="icon"/>
        <h6 class="text">Training</h6>
      </div>
      <div>
        Growth rate: {{pokemonSpecies.growthRate}} <br>
        Catch rate: {{pokemonSpecies.captureRate}} <br>
        Base happiness: {{pokemonSpecies.baseHappiness}} <br>
      </div>
    </section>

    <!-- Breeding -->
    <section>
      <div class="title">
        <fa-icon icon="egg" class="icon"/>
        <h6 class="text">Breeding</h6>
      </div>
    </section>
    
    <!-- Egg group -->
    <div class="micro-label uppercase">egg group</div>
    <div 
      v-for="item in pokemonSpecies.eggGroups"
      :key="item.name"> 
      <div class="capitalize">
        {{item.name}}
      </div>
    </div>

    <!-- Hatch counter -->
    <div class="micro-label uppercase">Hatch counter</div>
    {{pokemonSpecies.hatchCounter}}
  </div>
</template>

<script>
import BaseTag from '@/components/base/BaseTag.vue'
export default {
  name: 'PokemonAbout',
  components: {
    BaseTag
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
}
</script>

<style lang="scss" scoped>
  section {
    margin-bottom: $l;

    .title {
      margin-bottom: $s;
      display: flex;
      align-items: center;

      .icon {
        width: 12px;
      }
      .text {
        margin-left: $xs;
      }
    }

    .abilities-container {
      display: flex;

      .ability {
        margin-right: 10px;
      }
    }

    .physique-container {
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
  }
</style>