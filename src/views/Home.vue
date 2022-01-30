<template>
  <div>
    <h2 class="pokemon-logo">
      PokéView
    </h2>
    <MainMenuNavigation />
  </div>
</template>

<script>
import MainMenuNavigation from '@/components/mainMenu/MainMenuNavigation.vue'
export default {
  name: "Home",
  components: {
    MainMenuNavigation
  },
};
</script>

<style lang="scss" scoped>
.pokemon-logo {
  color: #000;
  font-size: 36px;
  font-weight: 900;
  margin-top: 45vh;
  text-align: center;
}
</style>