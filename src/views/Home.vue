<template>
  <div class="home">
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
.home {
  background: var(--color-bg-body);
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-logo {
  color: var(--color-text);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
}
</style>