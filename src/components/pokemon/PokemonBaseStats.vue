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
      </div>
    </div>
    <BaseModal
      v-if="currentType"
      @close-modal="toggleTypeModal('')"
    >
      <TypeModal :type-name="currentType" />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import PokemonBaseStatChart from "@/components/pokemon/PokemonBaseStatChart.vue";
import TypeModal from "@/components/types/TypeModal.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseTypeTag from "../base/BaseTypeTag.vue";
import type { ChartData } from "chart.js";
import { PokemonTypeName } from "@/helpers/types";

const props = defineProps<{ pokemon: Record<string, any> }>();

const isChartGenerated = ref(false);
const currentType = ref<PokemonTypeName | "">("");
const baseStatChartData = ref<ChartData<"radar">>({
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
});

const baseStatChartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    r: {
      angleLines: { color: "" },
      grid: { color: "", lineWidth: 3 },
      suggestedMin: 0,
      max: 255,
      ticks: { display: false, stepSize: 255 },
      pointLabels: {
        font: { size: 13, family: "Roboto condensed" },
        color: "",
      },
    },
  },
});

watch(
  () => props.pokemon,
  () => {
    isChartGenerated.value = false;
    nextTick(() => setChartData());
  },
);

onMounted(() => {
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--color-accent").trim();
  const accentDim = style.getPropertyValue("--color-accent-dim").trim();
  const graphColor = style.getPropertyValue("--color-graph").trim();
  const textColor = style.getPropertyValue("--color-text").trim();
  baseStatChartData.value.datasets[0].backgroundColor = graphColor;
  baseStatChartData.value.datasets[0].borderColor = accentDim;
  baseStatChartOptions.value.scales.r.angleLines.color = accentDim;
  baseStatChartOptions.value.scales.r.grid.color = accent;
  baseStatChartOptions.value.scales.r.pointLabels.color = textColor;
  setChartData();
});

type statLabel = [string, number] | [number, string];

type stat = {
  name: string;
  positionIndex: number;
  base_stat: number;
  stat: {
    name: string;
  };
}


function setChartData() {
  const labels: statLabel[] = [];
  const datasets: number[] = [];
  let positionIndex = 0;

  baseStatChartData.value.labels = [];
  baseStatChartData.value.datasets[0].data = [];

  props.pokemon.stats.forEach((stat: stat) => {
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
    labels[positionIndex] =
      positionIndex >= 2 && positionIndex <= 4
        ? [name, stat.base_stat]
        : [stat.base_stat, name];
    datasets[positionIndex] = stat.base_stat;
  });

  baseStatChartData.value.labels = labels;
  baseStatChartData.value.datasets[0].data = datasets;
  isChartGenerated.value = true;
}

function toggleTypeModal(type: PokemonTypeName | "") {
  currentType.value = type;
}
</script>

<style lang="scss" scoped>
.base-stat-container {
  padding: $space-32 0 $space-32;

  .section-title {
    margin: 0 0 $space-12 $space-16;
    font-size: $font-14;
  }

  .stat-wrapper {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;

    .stat-chart-container {
      max-width: 180px;
    }
  }
}

.right {
  width: 120px;
}

.pokemon-types {
  display: flex;
  flex-direction: column;
  gap: $space-8;
}
</style>
