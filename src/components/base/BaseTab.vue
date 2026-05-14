<template>
  <div class="tab-container">
    <div class="tab-list">
      <button
        v-for="(item, index) in items"
        :key="index"
        :class="['tab-item', { active: item.active }]"
     
        @click="changeTab(index)"
      >
        <div class="text uppercase condensed">
          {{ item.name }}
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTab",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    numberOfItems() {
      return this.items.length;
    }
  },
  mounted () {
    this.items.forEach((item, index) => {
      if(item.active) {
        this.activeIndex = index
      }
    });
  },
  methods: {
    changeTab(index) {
      this.activeIndex = index;
      this.$emit("changeTab", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-container {
  .tab-list {
    display: flex;
    background: var(--color-bg-secondary);
    border-radius: $space-16;
    padding: $space-4;

    .tab-item {
      cursor: pointer;
      color: var(--color-text-light);
      width: 100%;
      padding: $space-4 0;
      border-radius: $space-16;
      font-family: "Roboto Condensed", sans-serif;
      background: transparent;
      border: none;
      text-align: center;
      -webkit-tap-highlight-color: transparent;

      .text {
        font-weight: 400;

      }

      &.active {
        color: var(--color-tab-highlight);
        background: var(--color-bg-primary);
        transition: all 0.4s;

        .text {
          font-weight: 700;
        }
      }
    }
  }
  .border-line {
    background: var(--color-bg-secondary);
    height: 1px;
    position: relative;
    width: 100%;

    .indicator {
      background: var(--color-primary);
      height: 1px;
      position: absolute;
      transition: left 0.2s ease-in-out;
    }
  }
}
</style>