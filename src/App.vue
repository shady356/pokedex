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
* {
  margin: 0;
  padding: 0;
}

body {
  -webkit-overflow-scrolling: touch;
  background: var(--color-bg-body);
  color: var(--color-text);
}

.disable-scroll {
  overflow-y: hidden;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

ul li {
  list-style: none;
}
</style>
