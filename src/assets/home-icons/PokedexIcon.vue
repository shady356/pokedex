<template>
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="11"
      y="2.5"
      width="42"
      height="59"
      rx="6"
      class="rect"
      stroke-width="2"
    />
    <circle
      cx="20"
      cy="12"
      r="4"
      class="circle"
    />
    <path
      d="M53.5 22.5H30L23.5 28H10.5"
      class="path"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
</template>

<style lang="scss" scoped>
.rect {
  fill: var(--main-color-white);
  stroke: var(--main-color-dark);
}
.circle {
  fill: var(--main-color-dark);
}
.path {
  stroke: var(--main-color-dark);
}
</style>
