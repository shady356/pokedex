<template>
  <div class="base-stat-container">
    <div
       
      class="stat-wrapper"
    >
      <PokemonBaseStatChart
        v-if="isChartGenerated"
        :chart-data="baseStatChartData" 
        :options="baseStatChartOptions"
        :styles="chartStyles"
        ref="baseStatsChart"
      />
    </div>
    <div class="key-data">
      <div class="total-base-stats">
        <div class="uppercase letter-spacing micro-label">
          total
        </div>
        <h3>
          {{ totalBaseStatAnimated }}
        </h3>
      </div>
      <div class="did-you-know">
        <div class="uppercase letter-spacing micro-label">
          Did you know
        </div>
        <p class="content">
          <span class="capitalize">{{ pokemon.name }}</span>
          has the 3rd highest Attack -stat among grass types
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import PokemonBaseStatChart from '@/components/pokemon/PokemonBaseStatChart.vue'
export default {
  name: "PokemonAbout",
  components: {
    PokemonBaseStatChart
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      BASE_STAT_TOTAL: 16,
      tweenedNumber: 0,
      isChartGenerated: false,

      baseStatChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#00aadd44',
            data: []
          }
        ]
      },
      baseStatChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        scale: {
          ticks: {
            suggestedMin: 0,
            max: 255,
            display: false,
            stepSize: 255,
            backdropColor: '#08a'
          },
          pointLabels: {
            fontSize: 14,
            fontColor: '#999',
            fontStyle: 'bold',
            fontAlign: 'center',
            fontFamily: 'Roboto condensed',
            lineHeight: '1.2',
            wordWrap: 'break-word'
          }
        },
        
      }
    };
  },
  computed: {
    chartStyles () {
      return {
        width: '100%',
        position: 'relative'
      }
    },
    totalBaseStat() {
      let total = 0;
      this.pokemon.stats.forEach(stat => {
        total += stat.base_stat;
      });
      return total;
    },
    totalBaseStatAnimated() {
      return this.tweenedNumber.toFixed(0);
    },
    bestStat() {
      let bestStat = {
        name: this.pokemon.stats[0].stat.name,
        value: this.pokemon.stats[0].base_stat
      };
      this.pokemon.stats.forEach(stat => {
        if (stat.base_stat >= bestStat.value) {
          bestStat.name = stat.stat.name;
          bestStat.value = stat.base_stat;
        }
      });
      return bestStat;
    },
    stats() {
      return this.pokemon.stats
    }
  },
  watch: {
    totalBaseStat(newVal) {
      gsap.to(this.$data, { duration: 0.4, tweenedNumber: newVal });
    },
    pokemon() {
      this.isChartGenerated = false
      this.setChartData()
      this.$refs.baseStatsChart.update()
    }
  },
  mounted() {
    this.tweenedNumber = this.totalBaseStat;
    this.setChartData()
  },
  methods: {
    isBestStat(stat) {
      return this.bestStat.name === stat.stat.name;
    },
    getStatFillStatus(index, value) {
      const fragment = Math.round(value / this.BASE_STAT_TOTAL);
      return index <= fragment;
    },
    setChartData () {
      const labels = []
      const datasets = []
      let positionIndex = 0

      this.baseStatChartData.labels = []
      this.baseStatChartData.datasets[0].data = []

      this.pokemon.stats.forEach(stat => {
        let name = stat.stat.name

        switch(name) {
          case 'hp': 
            positionIndex = 0; 
            break;
          case 'defense':
            positionIndex = 1; 
            break;
          case 'special-defense':
            positionIndex = 2;
            name = 'spc.def'
            break;
          case 'speed': 
            positionIndex = 3; 
            break;
          case 'special-attack': 
            positionIndex = 4; 
            name = 'spc.atk'
            break;
          case 'attack': 
            positionIndex = 5; 
            break;
        }

        name = name.toUpperCase()

        labels[positionIndex] = [name, stat.base_stat]
        datasets[positionIndex] = stat.base_stat
      });

      this.baseStatChartData.labels = labels
      this.baseStatChartData.datasets[0].data = datasets
      this.isChartGenerated = true
      
    }
  }
};
</script>

<style lang="scss" scoped>
$total-base-stat-fragments: 8;

.base-stat-container {
  padding-bottom: $xxl;

  .stat-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;

    .stat-item {
      padding: 0 $xs $m;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .stat-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-basis: 35%;
        font-size: $font-s;
        text-align: right;
        justify-content: flex-end;

        &.highlight {
          font-weight: 700;
        }

        .stat-value {
          padding: 0 10px;
        }
      }

      .stat-bar {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-basis: 65%;

        .stat-bar-fragment {
          width: 100%;
          height: $xs;
          border-radius: 2px;
          background: #ddd;
          margin-right: $xxs;
          transition: background-color 0.4s ease-out;

          &.is-filled {
            background: $blue;
            transition: background-color 0.4s ease-in;
            animation: scale-x-in 0.4s ease;
          }
        }
      }
    }
  }
  .key-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: $l;

    .total-base-stats {
      text-align: right;
      padding-right: $l;
      border-right: 1px solid #ddd;
      flex-basis: 35%;
    }
    .did-you-know {
      flex-basis: 65%;
      padding: 0 $l;

      .content {
        font-size: $font-m;
      }
    }
  }
}
</style>