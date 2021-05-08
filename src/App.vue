<template>
  <div 
    id="app" 
    class="dark"
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
  background: #fff;

  &.bodyFilter {
    background: $purple-dark;
  }
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


body {
  background: #1a1a1a;
  color: #ddd;
}
</style>
