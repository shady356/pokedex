<template>
  <img
    :class="['progress-spinner', size]"
    src="@/assets/icons/pokeball_white.png"
    alt="loading ..."
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseProgressSpinner",
  props: {
    size: {
      type: String,
      default: "medium",
    },
  },
});
</script>

<style lang="scss" scoped>
.progress-spinner {
  animation: progressSpinner 3s infinite;

  &.medium {
    width: 36px;
    height: 36px;
  }
  &.large {
    width: 64px;
    height: 64px;
  }
}
</style>
