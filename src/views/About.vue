<template>
  <div class="about">
  <div v-touch:swipe="swipe"><h1>Swipe me!</h1></div>
  </div>
</template>

<script>

export default {
  name: 'About',
  methods: {
    swipe(swipe) {
      console.log(swipe)
    },
    bar() {
      console.log('click')
    }
  }
}
</script>

