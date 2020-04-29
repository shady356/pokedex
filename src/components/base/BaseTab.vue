<template>
  <div class="tab-container">
    <div 
      v-for="(item, index) in items"
      :class="['tab-item', {'active': item.active }]"
      :key="index"
      @click="changeTab(index)"
    >
      <h6 class="text uppercase condensed">{{item.name}}</h6>
      <div
        v-if="item.active" 
        class="active-line" 
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
  methods: {
    changeTab(index) {
      this.$emit('changeTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>

  $active-tab-color: #333;

  .tab-container {
    display: flex;
    justify-content: space-evenly;

    .tab-item {
      padding: $s;
      cursor: pointer;

      .text {
        font-weight: 400;
      }

      &.active {
        color: #444;
        transition: all .4s;

        .text {
          font-weight: 700;
        }
        .active-line {
          margin: 0 auto;
          margin-top: 2px;
          width: 16px;
          height: 1px;
          background: #aaa;
        }
      }
    }
  }
</style>