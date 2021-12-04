<template>
  <div>
    <!-- <div class="header">
      #{{id | index}}
      <span class="capitalize">{{pokemonList[index].name}}</span>
    </div> -->
    <div class="sprite-container">
      <div
        :style="'backgroundImage: url(' + pokemonSpriteImg + ')'"
        class="sprite"
      />
    </div>
  </div>
</template>

<script>
import {getPokemonSpriteByName} from '@/helpers/sprites.js'
export default {
  name: "PokedexItem",
  filters: {
    index(value) {
      if (value < 10) {
        return "00" + value;
      } else if (value < 100) {
        return "0" + value;
      } else {
        return value;
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
  },
  computed: {
     pokemonSpriteImg() {
      return getPokemonSpriteByName(this.name)
    },
  }
};
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
    border-radius: $s;
    height: 92px;
    width: 92px;
    padding: 10px;
    background: #fff6;
    border: 1px solid $green;
    background-position: center;
    background-size: 65%;
    background-repeat: no-repeat;

    @media (min-width: 1024px) {
      width: $xxxxxl;
      height: $xxxxxl;  
    }
  }
}

.dark {
  .sprite-container {
    .sprite {
      background: hsla(0, 0, 0%, .2);
      box-shadow: none;
    }
  }
}
</style>