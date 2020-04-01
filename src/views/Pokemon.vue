<template>
  <div class="default-page-margin">
    <div
      @click="$router.go(-1)"
    >
      <h6>back</h6>
    </div>

    <!-- The Pokemon -->
    <div
      v-if="pokemon"
      class="pokemon-container"
    >
      <!-- Sprite -->
      <div class="pokemon-sprite-container">
        <!-- <img 
          :src="getPokemonSprite(pokemon.id)"
          class="pokemon-sprite"
          alt="pokemon sprite"
        > -->
        <img 
          :src="pokemon.sprites.front_default"
          class="sprite"
          alt="pokemon sprite"
        >
      </div>
      
      <!-- Name -->
      <h4 
        class="uppercase letter-spacing condensed pokemon-name">
        {{pokemon.name}}
      </h4>

      <!-- Type(s) -->
      <div class="type-container">
        <BaseTag
          v-for="type in pokemon.types"
          :key="type.slot"
          :icon="getIcon(type.type.name)"
          :iconColor="getTypeColor(type.type.name)"
          :title="type.type.name"
        />
      </div>

      <!-- Stats -->
      <div class="stats-container">
        <div 
          class="stat"
          v-for="(stat, index) in pokemon.stats"
          :key="index"
        >
          <div class="uppercase condensed">
            {{stat.stat.name}}
            {{stat.base_stat}}
          </div>
          
          <div class="stat-bar">
            <div
              class="stat-bar-fill"
              :style="cssStatWidth(stat.base_stat)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTag from '@/components/base/BaseTag'
import axios from 'axios'
export default {
  name: 'Pokemon',
  components: {
    BaseTag
  },
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
    getIcon(name) {
      return require('@/assets/icons/types/' + name + '.svg')
    },
    getTypeColor (type) {
      switch(type) {
          case 'bug':     return '#92BC2C'; 
          case 'dark':    return '#595761'; 
          case 'dragon':  return '#0C69C8'; 
          case 'electric':return '#F2D94E'; 
          case 'fire':    return '#FBA54C'; 
          case 'fairy'    :return '#EE90E6'; 
          case 'fighting' :return '#D3425F'; 
          case 'flying'   :return '#A1BBEC'; 
          case 'ghost'    :return '#5F6DBC'; 
          case 'grass'    :return '#5FBD58'; 
          case 'ground'   :return '#DA7C4D'; 
          case 'ice'      :return '#75D0C1'; 
          case 'normal'   :return '#A0A29F'; 
          case 'poison'   :return '#B763CF'; 
          case 'psychic'  :return '#FA8581'; 
          case 'rock'     :return '#C9BB8A'; 
          case 'steel'    :return '#5695A3'; 
          case 'water'    :return '#539DDF'; 
      }
    },
    getPercentage (part, whole) {
      return (part / whole) * 100
    },
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
    },
    cssStatWidth (width) {
      let value = this.getPercentage(width, 255)
      return { '--width': value + '%'}
    },
    getPokemonSprite (id) {
      return require('@/assets/gen1/' + this.getIndex(id) + '.png')
    },
    getIndex (value) {
      if(value < 10) {
        return '00' + value
      } else if (value < 100) {
        return '0' + value
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .pokemon-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .pokemon-name {
      color: #222;
    }

    .pokemon-sprite-container {

      .pokemon-sprite {
        //width: $xxxxl;
        //height: $xxxxl;
        margin: 0;
        padding: 0;
      }
    }

    .type-container {
      display: flex;
      justify-content: center;
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      color: #000;
      width: 100%;

      .stat {
        padding: $s;

        .stat-bar {
          background: $purple-dark;
          border-radius: $xs;
          position: relative;
          width: 100%;
          height: $m;

          .stat-bar-fill {
            @include progress-grow(var(--width));
            position: absolute;
            border-radius: $xs 0 0 $xs;
            background: $purple;
            height: $m;
            width: var(--width);
          }
        }
      }
    }
  }
</style>