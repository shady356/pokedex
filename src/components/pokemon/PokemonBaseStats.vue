<template>
  <div>
    <div class="stat-wrapper">
      <div
        class="stat-item"
        v-for="(stat, index) in pokemon.stats"
        :key="index"
      >
        <div :class="['stat-label', {'highlight': isBestStat(stat)}]">
          <p class="stat-key uppercase">{{stat.stat.name | statName}}</p>
          <p class="stat-value">{{stat.base_stat}}</p>
        </div>
          
        <div class="stat-bar">
          <div 
            v-for="index in BASE_STAT_TOTAL"
            :key="index"
            :class="['stat-bar-fragment', {'is-filled': getStatFillStatus(index, stat.base_stat)}]"
          />
        </div>
      </div>
    </div>
    <div class="key-data">
      <div class="total-base-stats">
        <div class="uppercase letter-spacing micro-label">total</div>
        <h3>{{totalBaseStat}}</h3>
      </div>
      <div class="did-you-know">
        <div class="uppercase letter-spacing micro-label">Did you know</div>
        <p><span class="capitalize">{{pokemon.name}}</span> has the 3rd highest Attack -stat among grass types</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonAbout',
  filters: {
    statName(value) {
      if (value === 'special-defense') {
        return 'spc. def'
      }
      else if (value === 'special-attack') {
        return 'spc. att'
      }
      else {
        return value
      }
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      BASE_STAT_TOTAL: 16
    }
  },
  computed: {
    totalBaseStat () {
      let total = 0
      this.pokemon.stats.forEach(stat => {
        total += stat.base_stat
      });
      return total
    },
    bestStat() {
      let bestStat = { 
        name: this.pokemon.stats[0].stat.name,
        value: this.pokemon.stats[0].base_stat
      }
      this.pokemon.stats.forEach(stat => {
        if (stat.base_stat >= bestStat.value) {
          bestStat.name = stat.stat.name
          bestStat.value = stat.base_stat
        }
      })
      return bestStat
    },
  },
  methods: {
    isBestStat(stat) {
      return this.bestStat.name === stat.stat.name
    },
    getStatFillStatus(index, value) {
      const fragment = Math.round((value + 1) / this.BASE_STAT_TOTAL)
      return index <= fragment
    }
  }
}
</script>

<style lang="scss" scoped>
  .stat-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;

    .stat-item {
      padding: 0 $xs $s;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .stat-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-basis: 30%;
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
        flex-basis: 70%;

        .stat-bar-fragment {
          width: calc(100% / 16);
          height: $xs;
          border-radius: 2px;
          background: #ddd;
          margin-right: $xxs;
          transition: background .4s ease-out;

          &.is-filled {
            background: $blue;
            transition: background .4s ease-in;
            animation: scale-x-in .4s ease;
          }
        }
      }
    }
  }
  .key-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: $xxl;

    .total-base-stats {
      text-align: right;
      padding-right: $l;
      border-right: 1px solid #ddd;
      flex-basis: 35%;
    }
    .did-you-know {
      flex-basis: 65%;
      padding: 0 $l;
    }
  }
</style>