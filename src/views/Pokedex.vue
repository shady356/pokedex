<template>
  <div
    class="default-page-margin"
     v-if="pokemonList.length > 0">
    <ul>
      <router-link
        :to="{ name: 'Pokemon', params: { pokemonId: pokemon.id }}"
        v-for="pokemon in pokemonList" 
        :key="pokemon.id"
        tag="li"
      >
        <div class="header condensed">
          #{{pokemon.id | index}} 
          <span class="capitalize">{{pokemon.name}}</span>
        </div>
        <img 
          :src="pokemon.sprites.front_default"
          class="sprite"
          alt="pokemon sprite"
        >
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pokedex',
  components: {
 
  },
  filters: {
    index (value) {
      if(value < 10) {
        return '00' + value
      } else if (value < 100) {
        return '0' + value
      } else {
        return value
      }
    }
  },
  data() {
    return {
      localhostBase: 'http://localhost:8080',
      networkBase: 'http://192.168.0.18:8080/',

      pokemonList: []
    }
  },
  computed: {
    BASE_URL () {
      return this.networkBase
    }
  },
  mounted () {
    for(let i=1; i<=151; i++) {
      this.getPokemon(i)
    }
    this.pokemonList.sort()
  },
  methods: {
    getPokemon(pokemonId) {
      axios.get(`${this.BASE_URL}/pokemon-form/${pokemonId}/`)
      .then(response => {
        this.pokemonList.push(response.data)
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

  ul {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;

    li {
      text-align: center;
      margin: 0 1.5% $l;
      width: 30%;
      border-radius: $xs;
      background: hsla(0, 0%, 100%, .2);
      box-shadow: 0 0 10px $purple-light;
      cursor: pointer;

      .header {
        padding: $xs;
        border-radius: $xs $xs 0 0;
        background: $purple-light;
        font-size: $font-s;
        text-align: left;
      }

      .sprite {
        width: 96px;
      }
    }
  }
</style>