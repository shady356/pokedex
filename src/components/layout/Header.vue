<template>
  <header class="header">
    <router-link
      class="column"
      :to="{ name: routerBack }"
    >
      <fa-icon 
        icon="chevron-left" 
        class="go-back" 
      />
    </router-link>
    <div class="column">
      <slot name="title" />
    </div>
    <div class="column">
      <slot name="options" />
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
  }
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  background: $body-color;
  display: flex;
  padding: $s;
  position: sticky;
  top: 0;

  .column {
    text-align: center;

    &:nth-child(1) {
      flex-grow: 1;
      color: $body-color-text;
    }
    &:nth-child(2) {
      flex-grow: 12;
    }
    &:nth-child(3) {
      flex-grow: 1;
    }
  }
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