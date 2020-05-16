<template>
  <div>
    <div v-if="moves">
      <BaseTab
        class="tab-header"
        :items="tabs"
        @changeTab="changeMetaTab"
      />
      <table>
        <thead>
          <th>Move</th>
          <th>Type</th>
          <th>Effect</th>
          <th>Level</th>
          <th>Power</th>
          <th>Acc.</th>
        </thead>
        <tbody>
          <tr
            v-for="move in generations[selectedGeneration].levelUp"
            :key="move.name"
          >
            <td>{{ move.name }}</td>
            <td>{{ move.type }}</td>
            <td>{{ move.category }}</td>
            <td>{{ move.level }}</td>
            <td>{{ move.power }}</td>
            <td>{{ move.accuracy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Loading moves
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import BaseTypeTag from "@/components/base/BaseTypeTag";
import BaseTab from "@/components/base/BaseTab";
export default {
  name: "PokemonMoves",
  components: {
    //BaseTypeTag,
    BaseTab
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      moves: null,
      generations: [],
      totalGenerations: 7,
      selectedGeneration: 6,
      tabs: [
        {
          name: "1",
          active: false
        },
        {
          name: "2",
          active: false
        },
        {
          name: '3',
          active: false
        },
        {
          name: "4",
          active: false
        },
        {
          name: "5",
          active: false
        },
        {
          name: '6',
          active: false
        },
        {
          name: '7',
          active: true
        }
      ]
    };
  },
  computed: {
    HENRIKO_API() {
      return process.env.VUE_APP_HENRIKO_URL;
    }
  },
  mounted() {
    this.setupGenerationsDataSet()
    this.getMoves(this.pokemonId);
  },
  methods: {
    getMoves(pokemonId) {
      axios
        .get(`${this.HENRIKO_API}/moves/${pokemonId}.json`)
        .then(response => {
          this.moves = response.data;
          this.categorizeMovesToGenerations(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
    categorizeMovesToGenerations(moves) {
      moves.forEach(move => {
        move.generations.forEach(generation => {
          this.categorizeMoveToLearnMethod(move, generation)
        })
      });
    },
    categorizeMoveToLearnMethod(move, generation) {
      const data = {
        name: move.name,
        accuracy: move.details.accuracy,
        category: move.details.category,
        power: move.details.power,
        type: move.details.type,
        level: generation.level,
      }
      const generationIndex = parseInt(generation.generation) - 1
      console.log(generation.method)
      this.generations[generationIndex][generation.method].push(data)
    },
    setupGenerationsDataSet() {
      for(let i = 0; i < this.totalGenerations; i++) {
        const data = {
          name: 'gen' + (i+1),
          levelUp: [],
          egg: [],
          machine: [],
          tutor: []
        }
        this.generations.push(data)
      }
    },
    changeMetaTab(index) {
      this.tabs.forEach(tab => {
        tab.active = false;
      });
      this.tabs[index].active = true;
      this.selectedGeneration = index
    },
  }
};
</script>

<style lang="scss" scoped>
</style>