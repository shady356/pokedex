<template>
  <div>
    <Header>
      <template #title>
        <h1>Settings</h1>
      </template>
    </Header>

    <div class="settings">
      <section class="settings__section">
        <h2 class="settings__section-title">
          Appearance
        </h2>

        <div class="settings__row">
          <span class="settings__label">
            <span class="material-icons-round">palette</span>
            Theme
          </span>
          <div class="theme-toggle">
            <button
              v-for="option in themeOptions"
              :key="option.value"
              class="theme-toggle__btn"
              :class="{ 'theme-toggle__btn--active': currentTheme === option.value }"
              @click="selectTheme(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import { getTheme, setTheme } from "@/utils/theme";

export default {
  components: { Header },
  data() {
    return {
      currentTheme: getTheme(),
      themeOptions: [
        { value: 'light', label: 'Light' },
        { value: 'system', label: 'System' },
        { value: 'dark', label: 'Dark' },
      ],
    }
  },
  methods: {
    selectTheme(theme) {
      this.currentTheme = theme
      setTheme(theme)
    }
  }
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
    letter-spacing: 0.08em;
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

.theme-toggle {
  display: flex;
  background: var(--color-bg-secondary);
  border-radius: $space-8;
  padding: $space-2;
  gap: $space-2;

  &__btn {
    background: none;
    border: none;
    border-radius: calc(#{$space-8} - 2px);
    color: var(--color-text-light);
    cursor: pointer;
    font-size: 0.875rem;
    padding: $space-4 $space-12;
    transition: background 0.15s, color 0.15s;

    &--active {
      background: var(--color-bg-primary);
      color: var(--color-text);
      font-weight: 600;
    }
  }
}
</style>
