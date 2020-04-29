<template>
  <div>
    <!-- Abilities -->
    <h4>Abilities</h4>
    <div 
      v-for="item in pokemon.abilities"
      :key="item.ability.name"> 
      <div class="capitalize">
        {{item.ability.name}} <span v-if="item.is_hidden"> (Hidden)</span>
      </div>
    </div>

    <!-- Weight and height -->
    <h4>Weight and height</h4>
    <div>
      Weight {{pokemon.weight}}<br>
      Height {{pokemon.height}}
    </div>

    <!-- Training -->
    <h4>Training</h4>
    <div>
      Growth rate: {{pokemonSpecies.growthRate}} <br>
      Catch rate: {{pokemonSpecies.captureRate}} <br>
      Base happiness: {{pokemonSpecies.baseHappiness}} <br>
    </div>

    <!-- Breeding -->
    <img class="egg-icon" src="@/assets/icons/egg-solid.svg" alt="egg-icon">
    <h4>Breeding</h4>

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
export default {
  name: 'PokemonAbout',
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
  .egg-icon {
    display: inline-flex;
    width: 24px;
  }
</style>