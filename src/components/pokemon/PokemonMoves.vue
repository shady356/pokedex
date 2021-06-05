<template>
  <div>
    <div v-if="moves">
      <div class="generation">
        <h6>Generation:</h6>
        <BaseTab 
          class="tab-header" 
          :items="tabs" 
          @changeTab="changeTab" 
        />
      </div>
      <!-- TODO: Use a v-for on tables -->
      <BaseMoveTable
        v-if="generations[selectedGeneration].levelUp.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].levelUp"
        :types="types"
        category="levelUp"
        title="level up"
      />
      <BaseMoveTable
        v-if="generations[selectedGeneration].egg.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].egg"
        :types="types"
        category="egg"
        title="egg moves"
      />
      <BaseMoveTable
        v-if="generations[selectedGeneration].machine.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].machine"
        :types="types"
        category="tm-hm"
        title="TM / HM"
      />
      <BaseMoveTable
        v-if="generations[selectedGeneration].tutor.length > 0"
        :headers="tableHeaders"
        :items="generations[selectedGeneration].tutor"
        :types="types"
        category="tutor"
        title="learned by tutoring"
      />
    </div>
    <div v-else>
      Loading moves
    </div>
  </div>
</template>

<script>
import HenrikoApi from '@/service/henrikoApi.js'
import BaseMoveTable from "@/components/base/BaseMoveTable";
import BaseTab from "@/components/base/BaseTab";

export default {
  name: "PokemonMoves",
  components: {
    BaseMoveTable,
    BaseTab
  },
  props: {
    pokemonId: {
      type: [Number, String],
      required: true
    },
    types: {
      type: Array,
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
          name: "3",
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
          name: "6",
          active: false
        },
        {
          name: "7",
          active: true
        }
      ],
      tableHeaders: ["move", "type", "effect", "power", "acc."]
    };
  },
  computed: {
    HENRIKO_API() {
      return process.env.VUE_APP_HENRIKO_URL;
    }
  },
  mounted() {
    this.setupGenerationsDataSet();
    this.getMovesByPokemonId(this.pokemonId);
  },
  watch: {
    pokemonId () {
      this.getMovesByPokemonId(this.pokemonId);
    }
  },
  methods: {
    // Api
    async getMovesByPokemonId (id) {
      const response = await HenrikoApi.getPokemonMovesByPokemonId(id)

      this.moves = response.data;
      this.categorizeMovesToGenerations(response.data);
      this.sortTables();
      
      if (response.error) {
        console.log('error') // TODO: replace with toast
      }
    },
    categorizeMovesToGenerations(moves) {
      moves.forEach(move => {
        move.generations.forEach(generation => {
          this.categorizeMoveToLearnMethod(move, generation);
        });
      });
    },
    categorizeMoveToLearnMethod(move, generation) {
      const data = {
        name: move.name,
        accuracy: move.details.accuracy,
        category: move.details.category,
        power: move.details.power,
        type: move.details.type,
        level: generation.level
      };
      const generationIndex = parseInt(generation.generation) - 1;
      if (!this.isEdgeCaseLearnMethod(generation.method)) {
        this.generations[generationIndex][generation.method].push(data);
      }
    },
    sortTables() {
      const _sortBy = require("lodash.sortby");
      this.generations.forEach((generation, index) => {
        const keys = Object.keys(generation);
        keys.forEach(category => {
          if (category === "levelUp") {
            this.generations[index][category] = _sortBy(
              this.generations[index][category],
              "level"
            );
          } else {
            this.generations[index][category] = _sortBy(
              this.generations[index][category],
              "name"
            );
          }
        });
      });
    },
    setupGenerationsDataSet() {
      for (let i = 0; i < this.totalGenerations; i++) {
        const data = {
          name: "gen" + (i + 1),
          levelUp: [],
          egg: [],
          machine: [],
          tutor: []
        };
        this.generations.push(data);
      }
    },
    changeTab(index) {
      this.tabs.forEach(tab => {
        tab.active = false;
      });
      this.tabs[index].active = true;
      this.selectedGeneration = index;
    },
    isEdgeCaseLearnMethod(learnMethod) {
      switch (learnMethod) {
        case "stadium-surfing-pikachu":
          return true;
        default:
          return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.generation {
  align-items: center;
  display: flex;
  margin: $s 0 $m $s;

  .tab-header {
    margin-left: $s;
    width: 100%;
    overflow-x: scroll;
  }
}
</style>