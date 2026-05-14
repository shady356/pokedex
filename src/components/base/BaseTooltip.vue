<template>
  <div class="tooltip-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTooltip",
});
</script>

<style scoped>
.tooltip-container {
  position: absolute;
  background: var(--color-black);
  color: var(--color-white);
  font-size: 12px;
  padding: 10px;
  text-align: left;
}
</style>
