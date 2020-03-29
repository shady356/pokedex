<template>
  <div 
    v-if="pokemon"
    class="default-page-margin"
  >
    <h4>{{pokemon.name}}</h4>
    <img :src="pokemon.sprites.front_default" alt="">
    <div class="type-container">
      <!-- Replace with type component -->
      <div
        v-for="type in pokemon.types"
        :key="type.slot"
      >
        {{type.type.name}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pokemon',
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    },
  },
  data() {
    return {
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.0.18:8080/',

      pokemon: null
    }
  },
  computed: {
    BASE_URL () {
      return this.networkBase
    }
  },
  mounted () {
    this.getPokemon(this.pokemonId)
  },
  methods: {
    getPokemon(pokemonId) {
      axios.get(`${this.BASE_URL}/pokemon/${pokemonId}/`)
      .then(response => {
        console.log(response.data)
        this.pokemon = response.data
      })
      .catch(error => {
        console.log(error)
        // this.errored = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>