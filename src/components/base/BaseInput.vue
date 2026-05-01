<template>
  <input type="text">
</template>

<script>
export default {
  name: "BaseInput"
};
</script>

<style lang="scss" scoped>
input {
  background: var(--color-bg-primary);
  border: none;
  border: 1px solid var(--color-border);
  border-radius: $s;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  padding: $m $xs;
  outline: var(--color-primary);
  text-align: center;
}
</style>