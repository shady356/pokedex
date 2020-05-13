<template>
  <div class="about-container">
    <h1>About Pokedex</h1>
    <p>
      A small application to present Pokemon and their in-game meta data The
      data is served from PokéAPI (https://pokeapi.co/), a RESTful Pokemon API.
    </p>
    <h2>Project</h2>
    <p>
      The project is available from GitHub (https://github.com/shady356/pokedex)
    </p>
    <h2>Resources</h2>
    <p>
      Pokemon type icons from:
      https://github.com/duiker101/pokemon-type-svg-icons. UI icons from Font
      Awesome
    </p>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style lang="scss" scoped>
.about-container {
  margin: $l;
}
</style>