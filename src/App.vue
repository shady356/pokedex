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
body {
  //background: #73bcdd;
  background: linear-gradient(180deg, $blue-white 0%, $blue-light 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;

  &.bodyFilter {
    background: linear-gradient(180deg, $purple-white 0%, $purple-light 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100%;
  }
}

.disable-scroll {
  overflow: hidden;
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
