<template>
  <div>
    <!-- <div class="header">
      #{{id | index}}
      <span class="capitalize">{{pokemonList[index].name}}</span>
    </div> -->
    <div class="sprite-container">
      <div 
        :style="'backgroundImage: url(' + sprite + ')'" 
        class="sprite"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokedexItem',
   filters: {
    index(value) {
      if (value < 10) {
        return "00" + value
      } else if (value < 100) {
        return "0" + value
      } else {
        return value
      }
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    sprite: {
      type: String,
      required: true,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: $xxxs;
    border-radius: $xxs $xxs 0 0;
    background: $blue;
    font-size: $font-xs;
    text-align: center;
  }
  .sprite-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .sprite {
      border-radius: $xs;
      height: 48px;
      width: 48px;
      background: hsla(0, 0%, 90%, 0.2);
      box-shadow: 0 0 18px hsla(200, 50%, 100%, .5) inset;
      background-position: center;
      background-size: contain;
    }
  }
</style>