<template>
  <input type="text">
</template>

<script>
export default {
  name: 'BaseInput'
}
</script>

<style lang="scss" scoped>
  input {
    background: #111;
    border: none;
    border: 1px solid #333;
    border-radius: $s;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 2px;
    padding: $m $xs;
    outline: #08a;
    text-align: center;
  }
</style>