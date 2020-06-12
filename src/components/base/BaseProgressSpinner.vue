<template>
  <img
    :class="['progress-spinner', size]"
    src="@/assets/icons/pokeball_white.png"
    alt="loading ..."
  >
</template>

<script>
export default {
  name: 'BaseProgressSpinner',
  props: {
    size: {
      type: String,
      required: false,
      default: 'medium'
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-spinner {
    animation: rotate360 1.5s infinite;

    &.medium {
      width: 36px;
      height: 36px;
    }
    &.large {
      width: 64px;
      height: 64px;
    }
  }
</style>