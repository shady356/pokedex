<template>
  <div id="app">
    <router-view class="main-layout" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTheme, applyTheme } from "@/utils/theme";

export default defineComponent({
  name: "App",
  created() {
    applyTheme(getTheme());
  },
});
</script>

<style lang="scss">
@use "@/styles/normalize";
</style>
