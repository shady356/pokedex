<template>
  <div>
    <LayoutHeader>
      <template #title>
        Settings
      </template>
    </LayoutHeader>

    <div class="settings">
      <section class="settings__section">
        <h2 class="settings__section-title">
          Appearance
        </h2>

        <div class="settings__row">
          <div class="settings__left">
            <div class="settings__icon">
              <span class="material-icons-round">palette</span>
            </div>
            <div class="settings__label">
              Theme
            </div>
          </div>
          <BaseTab
            :items="tabItems"
            @change-tab="onChangeTab"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import LayoutHeader from "@/components/layout/LayoutHeader.vue";
import BaseTab from "@/components/base/BaseTab.vue";
import { getTheme, setTheme, type ThemeOption } from "@/utils/theme";

const currentTheme = ref<ThemeOption>(getTheme());
const themeOptions = [
  { value: "light" as ThemeOption, label: "Light" },
  { value: "dark" as ThemeOption, label: "Dark" },
  { value: "system" as ThemeOption, label: "System" },
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
    font-size: $font-12;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-secondary);
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

  &__left {
    display: flex;
    align-items: center;
    gap: $space-12;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: $space-8;
    font-size: $font-16;
    color: var(--color-text);

  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $space-40;
    height: $space-40;
    background: var(--color-bg-secondary);
    border-radius: 50%;
    color: var(--color-text);
  }
}

.material-icons-round {
  font-size: $font-24;
}
</style>
