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

<script setup lang="ts">
import { ref, onMounted } from "vue";

type TabItem = {
  name: string;
  active: boolean;
};

const props = defineProps<{ items: TabItem[] }>();
const emit = defineEmits<{ changeTab: [index: number] }>();

const activeIndex = ref(0);

onMounted(() => {
  props.items.forEach((item, index) => {
    if (item.active) activeIndex.value = index;
  });
});

function changeTab(index: number) {
  activeIndex.value = index;
  emit("changeTab", index);
}
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
