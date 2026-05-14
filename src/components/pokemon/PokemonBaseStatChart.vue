<template>
  <div>
    <Radar :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
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

export default defineComponent({
  name: "PokemonBaseStatChart",
  components: { Radar },
  props: {
    chartData: {
      type: Object as PropType<ChartData<"radar">>,
      required: true,
    },
    options: {
      type: Object as PropType<ChartOptions<"radar">>,
      required: true,
    },
  },
});
</script>
