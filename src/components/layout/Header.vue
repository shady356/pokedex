<template>
  <header class="header">
    <router-link
      class="header__column"
      :to="{ name: routerBack }"
    >
      <BaseButtonIcon>
        <span class="material-icons-round column__button-icon">arrow_back</span>
      </BaseButtonIcon>
    </router-link>
    <div class="header__column">
      <slot name="title" />
    </div>
    <div class="header__column">
      <slot name="options" />
    </div>
  </header>
</template>

<script>
import BaseButtonIcon from "@/components/base/BaseButtonIcon.vue";
export default {
  name: "Header",
  components: { BaseButtonIcon },
  props: {
    routerBack: {
      type: String,
      required: false,
      default: 'Home'
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  padding: $space-12;
  position: sticky;
  top: 0;
   background: var(--color-header);

  .header__column {
    display: flex;
    text-decoration: none;

    &:nth-child(1) {
      color: var(--color-text);
    }

    &:nth-child(2) {
      width: calc(100% - (#{$space-48}*2));
      justify-content: center;

      h1 {
        font-size: 1.8rem;
      }
    }

    &:nth-child(3) {
      justify-content: flex-end;
    }

    .column__button-icon {
      font-size: $space-24;
    }
  }
}
</style>