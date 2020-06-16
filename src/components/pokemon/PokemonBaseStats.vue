<template>
  <div class="base-stat-container">
    <h6 class="section-title">
      Base stats
    </h6>
    <div class="stat-wrapper">
      <PokemonBaseStatChart
        v-if="isChartGenerated"
        :chart-data="baseStatChartData" 
        :options="baseStatChartOptions"
        :styles="chartStyles"
        class="stat-chart-container"
        ref="baseStatsChart"
      />
      <div class="base-stat-addon-info">
        <div class="base-stats-total">
          <div class="hexagon-shape">
            <div class="uppercase letter-spacing micro-label">
              total
            </div>
            <h6 class="total-base-stat-number">
              {{ totalBaseStatAnimated }}
            </h6>
          </div>
        </div>
        <div class="base-stat-ranking">
          <div class="uppercase letter-spacing micro-label">
            Ranking
          </div>
          <div class="stars">
            <fa-icon
              v-for="index in 5"
              :key="index"
              :class="['icon', {'filled': index <= rankStars}]"
              icon="star"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="key-data">
      <div class="did-you-know">
        <div class="uppercase letter-spacing micro-label">
          Did you know
        </div>
        <p class="content">
          <span class="capitalize">{{ pokemon.name }}</span>
          has the 3rd highest Attack -stat among grass types
        </p>
      </div>
    </div> -->
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
            backgroundColor: '#00aaddcc',
            borderColor: '#00aaddcc',
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
            color: '#66ddcc66'
          },
          gridLines: {
            color: '#6dc',
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
            fontColor: ['#777', '#777', '#777', '#777', '#777', '#777']
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
        filter: drop-shadow(0px 1px #66ddcc66) 
                drop-shadow(1px 0px #66ddcc)
                drop-shadow(0px -1px #66ddcc66)
                drop-shadow(-1px 0px #66ddcc);
        
        .hexagon-shape {
          width: $xxl;
          height: $xxl;
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          background: #fff;
          
          .micro-label {
            padding-top: 12px;
            font-size: $font-xxs;
          }
          .total-base-stat-number {
            color: #555;
            line-height: $font-m;
          }
        }
      }
      
      .base-stat-ranking {
        text-align: center;
        
        .micro-label {
          font-size: $font-xs;
          line-height: $font-l;
        }
        .stars {
          display: flex;
          flex-direction: row;
          
          .icon {
            height: 10px;
            width: 10px;
            margin: 0 2px;
            color: #aaa;
            filter: drop-shadow(0 1px #888);
            transition: all .4s ease-out;
          
            &.filled {
              color: #ffaa00;
              transform: scaleX(-1);
              filter: drop-shadow(0 1px #d80);
              transition: all .4s ease-in;
            }
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