<template>
  <div 
    id="app" 
  >
    <!-- <BaseToast /> -->
    <router-view class="main-layout" />
  </div>
</template>

<script>
//import BaseToast from '@/components/base/BaseToast.vue'
export default {
  name: "App",
  components: {
    //BaseToast
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  width: 100%;
}

body {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  background: rgb(200, 223, 224);
  color: #444;

  /* &.bodyFilter {
    background: $purple-dark;
  } */

  // Dark theme:
  // background: #1a1a1a;
  // color: #ddd;
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
