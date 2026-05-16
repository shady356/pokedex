<template>
  <div>
    <Header>
      <template #title>
        <h1>Settings</h1>
      </template>
    </Header>

    <div class="settings">
      <section class="settings__section">
        <h2 class="settings__section-title">Appearance</h2>

        <div class="settings__row">
          <span class="settings__label">
            <span class="material-icons-round">palette</span>
            Theme
          </span>
          <BaseTab :items="tabItems" @change-tab="onChangeTab" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Header from "@/components/layout/Header.vue";
import BaseTab from "@/components/base/BaseTab.vue";
import { getTheme, setTheme, type ThemeOption } from "@/utils/theme";

const currentTheme = ref<ThemeOption>(getTheme());
const themeOptions = [
  { value: "light" as ThemeOption, label: "Light" },
  { value: "system" as ThemeOption, label: "System" },
  { value: "dark" as ThemeOption, label: "Dark" },
];

const tabItems = computed(() =>
  themeOptions.map((opt) => ({
    name: opt.label,
    active: currentTheme.value === opt.value,
  })),
);

function onChangeTab(index: number) {
  currentTheme.value = themeOptions[index].value;
  setTheme(themeOptions[index].value);
}
</script>

<style lang="scss" scoped>
.settings {
  padding: $space-24 $space-16;

  &__section {
    margin-bottom: $space-32;
  }

  &__section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-light);
    margin-bottom: $space-12;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-bg-primary);
    border-radius: $space-12;
    padding: $space-12 $space-16;
    min-height: $space-48;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: $space-8;
    font-size: 1rem;
    color: var(--color-text);

    .material-icons-round {
      font-size: 1.25rem;
    }
  }
}
</style>
