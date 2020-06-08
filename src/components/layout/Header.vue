<template>
  <header class="header">
    <router-link
      :to="{ name: routerBack }"
    >
      <fa-icon icon="chevron-left" />
    </router-link>
    <slot name="title" />
    <slot name="options" />
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
  background: hsla(0, 0%, 100%, 0.9);
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: $s;
  position: sticky;
  top: 0;
}
</style>