<template>
  <div id="app">
    <!-- <BaseToast /> -->
    <router-view class="main-layout" />
  </div>
</template>

<script>
import { getTheme, applyTheme } from '@/utils/theme'
//import BaseToast from '@/components/base/BaseToast.vue'
export default {
  name: "App",
  components: {
    //BaseToast
  },
  created() {
    applyTheme(getTheme())
  }
};
</script>

<style lang="scss">
@use '@/styles/normalize';
</style>
