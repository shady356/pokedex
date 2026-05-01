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
div {
  background: var(--color-bg-body);
  min-height: 100dvh;
}

.pokemon-logo {
  color: var(--color-text);
  font-size: 36px;
  font-weight: 900;
  margin-top: 45vh;
  text-align: center;
}
</style>