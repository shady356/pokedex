<template>
  <header class="header">
    <h3>Pokedex</h3>
    <div class="filter-container">

      <fa-icon 
        class="filter-item filter" 
        icon="filter"
        @click="filter()"
      />
      
      <fa-icon 
        class="filter-item search" 
        icon="search"
        @click="search()"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    filter() {
      this.$emit('filter')
    },
    search () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: hsla(0, 0%, 100%, .9);
    display: flex;
    align-items: center;
    padding: $s;
    justify-content: space-between;
    position: sticky;
    border-bottom: 1px solid #ddd;
    top: 0;

    .filter-container {
      display: flex;
      justify-content: flex-end;

      .filter-item {
        padding: 0 $xs;

        &.filter {
          color: $purple;
        }
        &.search {
          color: $green;
        }
      }
    }
  }
</style>