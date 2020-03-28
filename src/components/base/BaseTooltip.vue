<template>
  <div class="tooltip-container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BaseTooltip'
}
</script>

<style scoped>
  .tooltip-container {
    position: absolute;
    background: #000;
    color: #ddd;
    font-size: 10px;
    padding: 10px;
    text-align: left;
  }
</style>