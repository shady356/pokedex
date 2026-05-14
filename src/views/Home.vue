<template>
  <main class="home">
    <div class="pokeball-bg" aria-hidden="true">
      <PokeballIcon />
    </div>
    <h1 class="pokemon-logo">PokéView</h1>
    <MainMenuNavigation />
  </main>
</template>

<script setup lang="ts">
import MainMenuNavigation from "@/components/mainMenu/MainMenuNavigation.vue";
import PokeballIcon from "@/assets/home-icons/PokeballIcon.vue";
</script>

<style lang="scss" scoped>
.home {
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.pokeball-bg {
  position: absolute;
  bottom: -22%;
  right: -30%;
  pointer-events: none;
  color: var(--color-text);
  opacity: 0.05;

  :deep(svg) {
    width: min(85vw, 85vh);
    height: min(85vw, 85vh);
    animation: pokeball-idle 6s ease-in-out infinite;
  }
}

.pokemon-logo {
  color: var(--color-text);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
}
</style>
