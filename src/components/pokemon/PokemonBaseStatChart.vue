<script>
import { Radar } from 'vue-chartjs'
export default {
  extends: Radar,
  name: 'PokemonBaseStatChart',
  props: {
    chartdata: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style lang="scss" scoped>

</style>