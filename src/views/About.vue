<template>
  <div>
    <Header>
      <template #title>
        <h1>About</h1>
      </template> 
    </Header>
    <div class="about-container">
      <h3>About</h3>
      <p>
        A small application to present Pokemon and their in-game meta data. The
        data is served from PokéAPI (https://pokeapi.co/), a RESTful Pokemon API.
      </p>
      <h4>Project</h4>
      <p>
        The project is available from GitHub (https://github.com/shady356/pokedex)
      </p>
      <h4>Resources</h4>
      <p>All external resources in this application</p>
      <h5>Icons</h5>
      <p>
        Pokemon type icons from:
        https://github.com/duiker101/pokemon-type-svg-icons.
      </p>
      <p>
        UI icons from: https://fontawesome.com/
      </p>
      <h5>Sprites</h5>
      <p>
        Pokemon sprites from:
        https://pokemondb.net/sprites.
        Usage policy:
        https://pokemondb.net/about
      </p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
export default {
  name: "About",
  components: {
    Header
  },
};
</script>

<style lang="scss" scoped>
.about-container {
  margin: $l;

  h4 {
    margin: $xs 0 $s;
  }

  p {
    line-height: 1.3rem;
    margin: $xs 0 $s;
  }
}
</style>