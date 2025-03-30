<template>
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke-width="4"
      class="outer-circle"
    />
    <ellipse
      cx="32"
      cy="32"
      rx="13.6533"
      ry="13.6533"
      class="ellipse"
    />
    <rect
      x="44"
      y="30"
      width="17"
      height="4"
      class="rect"
    />
    <rect
      x="2"
      y="30"
      width="17"
      height="4"
      class="rect"
    />
    <circle
      cx="32"
      cy="32"
      r="8.96"
      class="inner-circle"
    />
  </svg>
</template>

<style lang="scss" scoped>
.outer-circle {
  fill: var(--main-color-white);
  stroke: var(--main-color-dark);
}
.ellipse {
  fill: var(--main-color-dark);
}
.rect {
  fill: var(--main-color-dark);
}
.inner-circle {
  fill: var(--main-color-white);
  stroke: none;
}
</style>