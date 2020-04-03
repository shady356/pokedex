<template>
  <div id="app" class="grid">
    <transition name="fade" mode="out-in">
      <Welcome v-if="isWelcome"/>
    </transition>
    <Header class="header-layout"/>
    <transition name="opacity" mode="out-in">
      <router-view class="main-layout"/>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Welcome from '@/components/Welcome.vue'
export default {
  name: 'App',
  components: {
    Header,
    Welcome
  },
  data () {
    return {
      isWelcome: true
    }
  },
  created() {
    let self = this
    setTimeout (function() {
      self.isWelcome = false
    }, 3000)
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
body {
  
  background: #111;
  background: hsl(286, 40%, 76%); 
  background-image: linear-gradient(180deg, hsl(234, 41%, 90%) 0%, hsl(293, 56%, 25%) 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}

#app {
  font-family: 'Roboto', sans-serif;
}

.disable-scroll {
  overflow: hidden;
}

ul li {
  list-style: none;
}


.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: $xxxl 1fr;
}

.header-layout {
  position: sticky;
  bottom: 0;
  grid-row-start: 1;
  grid-row-end: 1;
}
.main-layout {
  grid-row-start: 2;
  grid-row-end: 2;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
