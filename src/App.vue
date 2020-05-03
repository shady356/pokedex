<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in">
      <Welcome v-if="isWelcome"/>
    </transition> -->
    <!-- <transition name="opacity" mode="out-in"> -->
      <router-view class="main-layout"/>
    <!-- </transition> -->
  </div>
</template>

<script>
//import Welcome from '@/components/Welcome.vue'
export default {
  name: 'App',
  components: {
    //Welcome
  },
  data () {
    return {
      isWelcome: true
    }
  },
  /* created() {
    let self = this
    setTimeout (function() {
      self.isWelcome = false
    }, 3000)
  } */
}
</script>

<style lang="scss">
*{
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
