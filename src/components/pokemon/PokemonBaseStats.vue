<template>
  <div class="base-stat-container">
    <div class="stat-wrapper">
      <PokemonBaseStatChart
        v-if="isChartGenerated"
        :chart-data="baseStatChartData"
        :options="baseStatChartOptions"
        class="stat-chart-container"
      />

      <div class="right">
        <div class="pokemon-types">
          <BaseTypeTag
            :key="1"
            :type="pokemon.types[0]?.type.name"
            display-name
            @click="toggleTypeModal(pokemon.types[0]?.type.name)"
          />
          <BaseTypeTag
            :key="2"
            :type="pokemon.types[1]?.type.name"
            display-name
            @click="toggleTypeModal(pokemon.types[1]?.type.name)"
          />
        </div>
        <!--
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
      -->
      </div>

      <BaseModal
        v-if="currentType"
        @closeModal="toggleTypeModal('')"
      >
        <TypeModal :type-name="currentType" />
      </BaseModal>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import PokemonBaseStatChart from "@/components/pokemon/PokemonBaseStatChart.vue";
import TypeModal from "@/components/types/TypeModal";
import BaseModal from "@/components/base/BaseModal";
import BaseTypeTag from "../base/BaseTypeTag.vue";
export default {
  name: "PokemonBaseStats",
  components: {
    PokemonBaseStatChart,
    BaseTypeTag,
    BaseModal,
    TypeModal,
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweenedNumber: 0,
      isChartGenerated: false,
      currentType: "",

      baseStatChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "",
            borderColor: "",
            pointRadius: 0,
            borderWidth: 0,
            data: [],
          },
        ],
      },
      baseStatChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: "",
            },
            grid: {
              color: "",
              lineWidth: 3,
            },
            suggestedMin: 0,
            max: 255,
            ticks: {
              display: false,
              stepSize: 255,
            },
            pointLabels: {
              font: {
                size: 13,
                family: "Roboto condensed",
              },
              color: "",
            },
          },
        },
      },
    };
  },
  computed: {
    totalBaseStat() {
      let total = 0;
      this.pokemon.stats.forEach((stat) => {
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
        value: this.pokemon.stats[0].base_stat,
      };
      this.pokemon.stats.forEach((stat) => {
        if (stat.base_stat >= bestStat.value) {
          bestStat.name = stat.stat.name;
          bestStat.value = stat.base_stat;
        }
      });
      return bestStat;
    },
    stats() {
      return this.pokemon.stats;
    },
  },
  watch: {
    totalBaseStat(newVal) {
      gsap.to(this.$data, { duration: 0.4, tweenedNumber: newVal });
    },
    pokemon() {
      this.isChartGenerated = false;
      this.$nextTick(() => {
        this.setChartData();
      });
    },
  },
  mounted() {
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue("--color-accent").trim();
    const accentDim = style.getPropertyValue("--color-accent-dim").trim();
    const graphColor = style.getPropertyValue("--color-graph").trim();
    const textColor = style.getPropertyValue("--color-text").trim();
    this.baseStatChartData.datasets[0].backgroundColor = graphColor;
    this.baseStatChartData.datasets[0].borderColor = accentDim;
    this.baseStatChartOptions.scales.r.angleLines.color = accentDim;
    this.baseStatChartOptions.scales.r.grid.color = accent;
    this.baseStatChartOptions.scales.r.pointLabels.color = textColor;
    this.tweenedNumber = this.totalBaseStat;
    this.setChartData();
  },
  methods: {
    isBestStat(stat) {
      return this.bestStat.name === stat.stat.name;
    },
    setChartData() {
      const labels = [];
      const datasets = [];
      let positionIndex = 0;

      this.baseStatChartData.labels = [];
      this.baseStatChartData.datasets[0].data = [];

      this.pokemon.stats.forEach((stat) => {
        let name = stat.stat.name;

        switch (name) {
          case "hp":
            positionIndex = 0;
            name = "HP";
            break;
          case "attack":
            positionIndex = 1;
            name = "Attack";
            break;
          case "defense":
            positionIndex = 2;
            name = "Defense";
            break;
          case "speed":
            positionIndex = 3;
            name = "Speed";
            break;
          case "special-defense":
            positionIndex = 4;
            name = "Sp. Def";
            break;
          case "special-attack":
            positionIndex = 5;
            name = "Sp. Atk";
            break;
        }

        if (positionIndex >= 2 && positionIndex <= 4) {
          labels[positionIndex] = [name, stat.base_stat];
        } else {
          labels[positionIndex] = [stat.base_stat, name];
        }

        datasets[positionIndex] = stat.base_stat;
      });

      this.baseStatChartData.labels = labels;
      this.baseStatChartData.datasets[0].data = datasets;
      this.isChartGenerated = true;
    },

    toggleTypeModal(type) {
      this.currentType = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-stat-container {
  padding: $space-32 0 $space-32;

  .section-title {
    margin: 0 0 $space-12 $space-16;
    font-size: $font-s;
  }

  .stat-wrapper {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;

    .stat-chart-container {
      max-width: 180px;
    }

    .base-stat-addon-info {
      display: flex;
      flex-direction: column;
      margin-top: $space-24;
      align-items: center;

      .base-stats-total {
        margin-bottom: $space-24;
        width: $space-48;
        height: $space-48;
        text-align: center;
        filter: drop-shadow(0px 1px var(--color-accent-dim))
          drop-shadow(1px 0px var(--color-accent))
          drop-shadow(0px -1px var(--color-accent-dim))
          drop-shadow(-1px 0px var(--color-accent));

        .hexagon-shape {
          width: $space-48;
          height: $space-48;
          clip-path: polygon(
            50% 0%,
            95% 25%,
            95% 75%,
            50% 100%,
            5% 75%,
            5% 25%
          );
          background: var(--color-bg-primary);

          .micro-label {
            padding-top: 12px;
            font-size: $font-xxs;
          }
          .total-base-stat-number {
            color: var(--color-text-light);
            line-height: $font-m;
            font-size: $font-s;
          }
        }
      }
    }
  }
}

.pokemon-types {
  display: flex;
  flex-direction: column;
  gap: $space-8;
}
</style>
