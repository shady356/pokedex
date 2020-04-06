<template>
  <div>
    <keep-alive
      class="default-page-margin"
      v-if="loadedCounter > 0"
    >
      <ul>
        <router-link
          :to="{ name: 'Pokemon', params: { pokemonId: pokemonList[index].id }}"
          v-for="(n,index) in batchOffset" 
          :key="index"
          tag="li"
        >
          <div class="header">
            #{{pokemonList[index].id | index}} 
            <span class="capitalize">{{pokemonList[index].name}}</span>
          </div>
          <div class="sprite-container">
            <img 
              :src="pokemonList[index].sprite"
              class="sprite"
            >
          </div>
        </router-link>
      </ul>
    </keep-alive>
    <div 
      v-else
      class="loading"
    >
      <img class="loading-icon" src="@/assets/icons/pokeball_white.png" alt="">
    </div>
    <div class="trigger" ref="trigger">
    </div>
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

      pokemonList: [],
      
      //Batch data:
      currentBatch: 1,
      maxPerBatch: 12,
      totalResults: 700,
      loadedCounter: 0,
      showLoader: false
      
    }
  },
  computed: {
    BASE_URL () {
      return this.networkBase
    },
    batchCount () {
      return Math.ceil(this.totalResults / this.maxPerBatch)
    },
    batchOffset () {
      return this.maxPerBatch * this.currentBatch
    },
    batchStartPosition () {
      return (this.currentBatch*this.maxPerBatch) - this.maxPerBatch + 1
    }
  },
  mounted () {
    for (let i = 0; i < 700; i++) {
      this.pokemonList.push(
        {
          id: i+1,
          name: '',
          sprite: ''
        }
      )
    }
    this.scrollTrigger()
  },
  methods: {
    getPokemon(pokemonId) {
      axios.get(`${this.BASE_URL}/pokemon-form/${pokemonId}/`)
      .then(response => {
        this.refineResponseData(response.data)
        this.loadedCounter ++
      })
      .catch(error => {
        console.log(error)
        // this.errored = true
      })
    },
    refineResponseData(data) {
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default
      }
      this.pokemonList[data.id-1] = pokemonData
    },
    getBatchOfPokemon () {
      for(let i= this.batchStartPosition; i <= this.maxPerBatch * this.currentBatch; i++) {
        this.getPokemon(i)
      }
      this.currentBatch ++
    },
    scrollTrigger () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.intersectionRatio > 0 && this.currentBatch < this.batchCount) {
            console.log('foobar')
            this.getBatchOfPokemon()
          }
        })
      })
      observer.observe(this.$refs.trigger)
    }
  }
}
</script>

<style lang="scss" scoped>
  .trigger {
    position: relative;
  }
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
      background: hsla(0, 0%, 90%, 0.2);
      box-shadow: 0 0 10px $blue-light;
      cursor: pointer;

      .header {
        padding: $xs;
        border-radius: $xs $xs 0 0;
        background: $blue;
        font-size: $font-s;
        text-align: center;
      }
      .sprite-container {
        height: 96px;
        .sprite {
          width: 96px;
        }
      }
    }
  }

  .loading {
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;

    .loading-icon {
      width: 64px;
      height: 64px;
      animation: rotate360 1.5s infinite;
    }
  }
</style>