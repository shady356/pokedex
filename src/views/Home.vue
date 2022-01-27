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
  position: absolute;
  top: 40%;
  color: #fff;
  display: flex;
  font-family: 'Fjalla One', sans-serif;
  font-size: 36px;
  font-weight: 100;
  justify-content: center;
  text-align: center;
  text-shadow: 2px 2px var(--main-color-dark);
  width: 100%;
}
</style>