<template>
  <header class="header">
    <router-link
      class="header__column"
      :to="{ name: routerBack }"
    >
      <button class="column__button">
        <fa-icon 
          icon="chevron-left"  
        />
      </button>
    </router-link>
    <div class="header__column">
      <slot name="title" />
    </div>
    <div
      class="header__column"
    >
      <button
        class="column__button"
        v-if="hasOptionsSlot"
      >
        <slot name="options" />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    routerBack: {
      type: String,
      required: false,
      default: 'Home'
    }
  },
  computed: {
    hasOptionsSlot () {
      return !!this.$slots['options']
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  padding: $s;
  position: sticky;
  top: 0;
  background: var(--main-color-body);

  .header__column {
    display: flex;

    &:nth-child(1) {
      color: var(--main-color);
    }
    &:nth-child(2) {
      width: calc(100% - (#{$xxl}*2));
      justify-content: center;
    }
    &:nth-child(3) {
      justify-content: flex-end;
    }
    .column__button {
      align-items: center;
      background: none;
      //background: var(--main-color-light);
      border-radius: 50%;
      border: none;
      display: flex;
      height: $xxl;
      justify-content: center;
      width: $xxl;
    }
  }
}
</style>