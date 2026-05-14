<template>
  <div id="app">
    <router-view class="main-layout" />
  </div>
</template>

<script setup lang="ts">
import { getTheme, applyTheme } from "@/utils/theme";

applyTheme(getTheme());
</script>

<style lang="scss">
@use "@/styles/normalize";
</style>
