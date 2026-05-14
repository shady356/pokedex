<template>
  <div>
    <Radar :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Radar } from "vue-chartjs";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

defineProps<{
  chartData: ChartData<"radar">;
  options: ChartOptions<"radar">;
}>();
</script>
