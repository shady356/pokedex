<template>
  <div id="app">
    <router-view class="main-layout" />
  </div>
</template>

<script>
import { getTheme, applyTheme } from '@/utils/theme'
export default {
  name: "App",
  created() {
    applyTheme(getTheme())
  }
};
</script>

<style lang="scss">
@use '@/styles/normalize';
</style>
