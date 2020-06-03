<script>
import { Radar } from 'vue-chartjs'
export default {
  extends: Radar,
  name: 'PokemonBaseStatChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    update() {
      this.$data._chart.update()
    }
  }
}
</script>