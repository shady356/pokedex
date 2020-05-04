<template>
  <div class="tab-container">
    <div class="tab-list">
      <div 
        v-for="(item, index) in items"
        :class="['tab-item', {'active': item.active }]"
        :key="index"
        @click="changeTab(index)"
      >
        <h6 class="text uppercase condensed">{{item.name}}</h6>
      </div>
    </div>
    <div class="border-line">
      <div
        :style="
          'width: calc(100% /' + numberOfItems + ' ); left:' + activeIndex * 100 / numberOfItems + '%'
        " 
        class="indicator"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base-Tab',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    numberOfItems () {
      return this.items.length
    }
  },
  methods: {
    changeTab(index) {
      this.activeIndex = index
      this.$emit('changeTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>

  $active-tab-color: #333;
  .tab-container {

    .tab-list {
      display: flex;
      padding-bottom: 6px;

      .tab-item {
        cursor: pointer;
        width: 50%;
        text-align: center;

        .text {
          font-weight: 400;
        }

        &.active {
          color: #444;
          transition: all .4s;

          .text {
            font-weight: 700;
          }
        }
      }
    }
    .border-line {
      background: #eee;
      height: 1px;
      position: relative;
      width: 100%;

      .indicator {
        background: $blue;
        height: 1px;
        position: absolute;
        transition: left .2s ease-in-out;
      }
    }
  }
</style>