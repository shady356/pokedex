<template>
  <div>
    <Header>
      <template #title>
        <h3>Types</h3>
      </template> 
    </Header>
    <div class="types-list-container">
      <TypesList />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import TypesList from "@/components/types/TypesList.vue";
export default {
  name: 'Types',
  components: {
    Header,
    TypesList
  }
}
</script>

<style lang="scss" scoped>
  .types-list-container {
    margin: $m;
  }
</style>