<template>
  <div>
    <div v-if="moves">
      <pre>{{ moves }}</pre>
    </div>
    <div v-else>
      Loading moves
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import BaseTypeTag from "@/components/base/BaseTypeTag";
export default {
  name: "PokemonMoves",
  components: {
    //BaseTypeTag
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      moves: null
    };
  },
  computed: {
    HENRIKO_API() {
      return process.env.VUE_APP_HENRIKO_URL;
    }
  },
  mounted () {
    this.getMoves(this.pokemonId)
  },
  methods: {
    getMoves(pokemonId) {
      axios
        .get(`${this.HENRIKO_API}/moves/${pokemonId}.json`)
        .then(response => {
          this.moves = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>