<template>
  <div id="app">
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
  background: var(--main-color-strong);
  min-height: 100%;
}

body {
  min-height: 100vh;
  -webkit-overflow-scrolling: touch;
  background: var(--main-color-body);
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: var(--main-color-black);

  /* &.bodyFilter {
    background: var(--purple-dark);
  } */
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
