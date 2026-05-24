<template>
  <header class="header">
    <router-link
      :to="{ name: routerBack }"
    >
      <BaseButtonIcon>
        <span class="material-icons-round">arrow_back</span>
      </BaseButtonIcon>
    </router-link>
    <h1 class="header__title">
      <slot name="title" />
    </h1>

    <slot name="options" />
  </header>
</template>

<script setup lang="ts">
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";

withDefaults(defineProps<{ routerBack?: string }>(), { routerBack: "Home" });
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: grid;
  padding: $space-12 $space-16;
  position: sticky;
  top: 0;
  background: var(--color-header);
  grid-template-columns: #{$space-40} 1fr #{$space-40};

  &__title {
    font-size: $font-24;
    text-align: center;
  }
}
</style>
