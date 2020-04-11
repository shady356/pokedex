<template>
  <div class="tab-container">
    <div 
      v-for="(item, index) in items"
      :class="['tab-item', {'active': item.active }]"
      :key="index"
      @click="changeTab(index)"
    >
      <h6 class="text uppercase condensed">{{item.name}}</h6>
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
      flex-grow: 1;
      text-align: center;
      border: 1px solid #aaa;
      border-right-color: transparent;
      cursor: pointer;

      .text {
        font-weight: 400;
      }

      &:first-child {
        border-radius: $s 0 0 $s;
      }
      &:last-child {
        border-radius: 0 $s $s 0;
        border-right-color: #aaa;
      }

      &.active {
        background: $active-tab-color;
        border: 1px solid transparent;
        color: #fff;

        .text {
          font-weight: 700;
        }
      }
    }
  }
</style>