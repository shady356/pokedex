<template>
  <div class="home">
    <div
      class="pokeball-bg"
      aria-hidden="true"
    >
      <PokeballIcon />
    </div>
    <h2 class="pokemon-logo">
      PokéView
    </h2>
    <MainMenuNavigation />
  </div>
</template>

<script>
import MainMenuNavigation from '@/components/mainMenu/MainMenuNavigation.vue'
import PokeballIcon from '@/assets/home-icons/PokeballIcon.vue'
export default {
  name: "Home",
  components: {
    MainMenuNavigation,
    PokeballIcon,
  },
};
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

@keyframes pokeball-idle {
  0%, 60%, 100% { transform: rotate(0deg); }
  65%            { transform: rotate(10deg); }
  72%            { transform: rotate(-5deg); }
  78%            { transform: rotate(7deg); }
  85%            { transform: rotate(0deg); }
}
</style>