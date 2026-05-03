<template>
  <div class="base-stat-container">
    <h3 class="section-title">
      Base stats
    </h3>
    <div class="stat-wrapper">
      <PokemonBaseStatChart
        v-if="isChartGenerated"
        ref="baseStatsChart" 
        :chart-data="baseStatChartData"
        :options="baseStatChartOptions"
        :styles="chartStyles"
        class="stat-chart-container"
      />
      <div class="base-stat-addon-info">
        <div class="base-stats-total">
          <div class="hexagon-shape">
            <div class="uppercase letter-spacing micro-label">
              total
            </div>
            <h4 class="total-base-stat-number">
              {{ totalBaseStatAnimated }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import PokemonBaseStatChart from '@/components/pokemon/PokemonBaseStatChart.vue'
export default {
  name: "PokemonBaseStats",
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
      rankStars: 0,
      isChartGenerated: false,
      bestStatIndex: null,

      baseStatChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: '',
            borderColor: '',
            pointRadius: 0,
            borderWidth: 0,
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
          angleLines: {
            color: ''
          },
          gridLines: {
            color: '',
            lineWidth: 2
          },
          ticks: {
            suggestedMin: 0,
            max: 255,
            display: false,
            stepSize: 255
          },
          pointLabels: {
            fontSize: 12,
            fontAlign: 'center',
            fontFamily: 'Roboto condensed',
            lineHeight: 1.3,
            fontColor: ''
          }
        },
        
      }
    };
  },
  computed: {
    chartStyles () {
      return {
        width: '50%',
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
    },
  },
  watch: {
    totalBaseStat(newVal) {
      gsap.to(this.$data, { duration: 0.4, tweenedNumber: newVal });
    },
    pokemon() {
      this.isChartGenerated = false
      this.setChartData()
      this.rankStars = this.getStarRankBasedOnTotalBaseStats()
      this.$refs.baseStatsChart.update()
    }
  },
  mounted() {
    const style = getComputedStyle(document.documentElement)
    const accent = style.getPropertyValue('--color-accent').trim()
    const accentDim = style.getPropertyValue('--color-accent-dim').trim()
    const graphColor = style.getPropertyValue('--color-graph').trim()
    const textColor = style.getPropertyValue('--color-text').trim()
    this.baseStatChartData.datasets[0].backgroundColor = graphColor
    this.baseStatChartData.datasets[0].borderColor = accentDim
    this.baseStatChartOptions.scale.angleLines.color = accentDim
    this.baseStatChartOptions.scale.gridLines.color = accent
    this.baseStatChartOptions.scale.pointLabels.fontColor = textColor
    this.tweenedNumber = this.totalBaseStat;
    this.rankStars = this.getStarRankBasedOnTotalBaseStats()
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
            name = 'HP'
            break;
          case 'attack': 
            positionIndex = 1;
            name = 'Attack'
            break;
          case 'defense':
            positionIndex = 2;
            name = 'Defense'
            break;
          case 'speed':
            positionIndex = 3;
            name = 'Speed'
            break;
          case 'special-defense':
            positionIndex = 4;
            name = 'Sp. Def'
            break;
          case 'special-attack': 
            positionIndex = 5; 
            name = 'Sp. Atk'
            break;
        }
        
        if(positionIndex >= 2 && positionIndex <= 4 ) {
          labels[positionIndex] = [name, stat.base_stat]
        } else {
          labels[positionIndex] = [stat.base_stat, name]
        }

        datasets[positionIndex] = stat.base_stat
      });

      this.baseStatChartData.labels = labels
      this.baseStatChartData.datasets[0].data = datasets
      this.isChartGenerated = true
      
    },
    getStarRankBasedOnTotalBaseStats() {
      const total = parseInt(this.totalBaseStat)
      if(total <= 200) {
        return 1
      } else if (total <= 340) {
        return 2
      } else if (total <= 475) {
        return 3
      } else if (total <= 540) {
        return 4
      } else {
        return 5
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.base-stat-container {
  padding: $xs 0 $xl;

  .section-title {
    margin: 0 0 $s $m;
    font-size: 14px;
  }

  .stat-wrapper {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;
    
    .base-stat-addon-info {
      display: flex;
      flex-direction: column;
      margin-top: $l;
      align-items: center;

      .base-stats-total {
        margin-bottom: $l;
        width: $xxl;
        height: $xxl;
        text-align: center;
        filter: drop-shadow(0px 1px var(--color-accent-dim))
                drop-shadow(1px 0px var(--color-accent))
                drop-shadow(0px -1px var(--color-accent-dim))
                drop-shadow(-1px 0px var(--color-accent));
        
        .hexagon-shape {
          width: $xxl;
          height: $xxl;
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          background: var(--color-bg-primary);
          
          .micro-label {
            padding-top: 12px;
            font-size: $font-xxs;
          }
          .total-base-stat-number {
            color: var(--color-text-light);
            line-height: $font-m;
            font-size: 14px;
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

    .did-you-know {
      padding: 0 $l;

      .content {
        font-size: $font-m;
      }
    }
  }
}
</style>