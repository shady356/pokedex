<template>
  <div class="base-stat-container">
    <div class="stat-wrapper">
      <PokemonBaseStatChart
        v-if="isChartGenerated"
        :chart-data="baseStatChartData" 
        :options="baseStatChartOptions"
        :styles="chartStyles"
        class="stat-chart-container"
        ref="baseStatsChart"
      />
      <div class="total-base-stats">
        <div class="uppercase letter-spacing micro-label">
          total
        </div>
        <h4>
          {{ totalBaseStatAnimated }}
        </h4>
      </div>
    </div>
    <div class="key-data">
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
      tweenedNumber: 0,
      isChartGenerated: false,

      baseStatChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#00aaddcc',
            pointRadius: 0,
            //borderWidth: 0,
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
            fontColor: '#555',
            fontAlign: 'center',
            fontFamily: 'Roboto condensed',
            lineHeight: '1.2',
            wordWrap: 'break-word',
            pointBackgroundColor: '#ffffff'
          }
        },
        
      }
    };
  },
  computed: {
    chartStyles () {
      return {
        width: '65%',
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
          case 'attack': 
            positionIndex = 1; 
            break;
          case 'defense':
            positionIndex = 2;
            break;
          case 'speed': 
            positionIndex = 3; 
            break;
          case 'special-defense':
            positionIndex = 4;
            name = 'sp. def'
            break;
          case 'special-attack': 
            positionIndex = 5; 
            name = 'sp. atk'
            break;
        }

        name = name.toUpperCase()
        
        if(positionIndex >= 2 && positionIndex <= 4 ) {
          labels[positionIndex] = [stat.base_stat, name]
        } else {
          labels[positionIndex] = [name, stat.base_stat]
        }

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

.base-stat-container {
  padding: $l 0 $xxl;

  .stat-wrapper {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;

    .total-base-stats {
      border: 1px solid #ddd;
      border-radius: 50%;
      padding: $s;
      text-align: center;

      .micro-label {
        font-size: $font-xs;
      }
    }
  }

  .key-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: $l;

    .did-you-know {
      padding: 0 $l;

      .content {
        font-size: $font-m;
      }
    }
  }
}
</style>