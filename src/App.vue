<template>
  <div id="app" class="grid">
    <Header class="header-layout"/>
    <transition name="opacity" mode="out-in">
      <router-view class="main-layout"/>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
body {
  background: hsl(286, 40%, 76%); 
  background-image: linear-gradient(150deg, hsl(300, 40%, 87%) 0%, hsl(286, 40%, 76%) 100%);
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

</style>
