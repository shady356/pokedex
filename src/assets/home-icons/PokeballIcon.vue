<template>
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <mask id="pokeball-mask">
        <rect width="64" height="64" fill="white" />
        <!-- Horizontal band cutout -->
        <rect x="0" y="30" width="64" height="4" fill="black" />
        <!-- Button ring cutout -->
        <circle cx="32" cy="32" r="12" fill="black" />
        <!-- Center button filled back in -->
        <circle cx="32" cy="32" r="7" fill="white" />
      </mask>
    </defs>
    <circle cx="32" cy="32" r="30" fill="currentColor" mask="url(#pokeball-mask)" />
  </svg>
</template>
