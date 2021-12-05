<template>
  <header class="header">
    <router-link
      class="column"
      :to="{ name: routerBack }"
    >
      <button class="header-button">
        <fa-icon 
          icon="chevron-left" 
          class="go-back" 
        />
      </button>
    </router-link>
    <div class="column">
      <slot name="title" />
    </div>
    <div
      class="column"
    >
      <button
        class="header-button"
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
  background: var(--main-color);
  display: flex;
  padding: $s;
  position: sticky;
  top: 0;

  .column {
    display: flex;

    &:nth-child(1) {
      flex-grow: 1;
      color: var(--main-color);
    }
    &:nth-child(2) {
      flex-grow: 12;
      justify-content: center;
    }
    &:nth-child(3) {
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
}
.header-button {
  align-items: center;
  background: var(--main-color-light);
  border-radius: 50%;
  border: none;
  display: flex;
  height: $s;
  justify-content: center;
  padding: $m;
  width: $s;
}
.dark {
  .header {
    background: hsla(0, 0%, 10%, 0.9);
    border-bottom: 1px solid #333;
    color: #fff;
    
    .go-back {
      color: #fff;
    }
  }
}
</style>