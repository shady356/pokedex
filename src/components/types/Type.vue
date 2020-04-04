<template>
  <div
    v-if="typeRelation"
    class="modal-type-container">
    <div 
      class="type-icon-container"
      :style="'background:' + getTypeColor(type)"
    >
      <img
        class="type-icon" 
        :src="getIcon(type)" 
        alt="type-icon"
      >
    </div>
    <h3 class="type-title uppercase">{{type}}</h3>
    <p>
      Most Flying type Pokémon are based on birds or insects, along with some mythical creatures like dragons. On average they are faster than any other type.
    </p>
    <h5>Super effective against</h5>
    <div class="type-damage-relation-container">
      <BaseTag
        v-for="(typeItem, index) in typeRelation.superEffectiveTo"
        :key="index"
        :icon="getIcon(typeItem)"
        :iconColor="getTypeColor(typeItem)"
        :title="typeItem"
        class="tag-item"
      />
    </div>
    <h5>Watch out for</h5>
    <div class="type-damage-relation-container">
      <BaseTag
        v-for="(typeItem, index) in typeRelation.superEffectiveFrom"
        :key="index"
        :icon="getIcon(typeItem)"
        :iconColor="getTypeColor(typeItem)"
        :title="typeItem"
        class="tag-item"
      />
    </div>
  </div>
</template>

<script>
import {$types} from '@/helpers/types.js'
import BaseTag from '@/components/base/BaseTag'
export default {
  name: 'Type',
  components: {
    BaseTag
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      typeRelation: null
    }
  },
  methods: {
    getIcon(name) {
      console.log(name)
      return require('@/assets/icons/types/' + name + '.svg')
    },
    getTypeColor (type) {
      switch(type) {
          case 'bug':     return '#92BC2C'; 
          case 'dark':    return '#595761'; 
          case 'dragon':  return '#0C69C8'; 
          case 'electric':return '#F2D94E'; 
          case 'fire':    return '#FBA54C'; 
          case 'fairy'    :return '#EE90E6'; 
          case 'fighting' :return '#D3425F'; 
          case 'flying'   :return '#A1BBEC'; 
          case 'ghost'    :return '#5F6DBC'; 
          case 'grass'    :return '#5FBD58'; 
          case 'ground'   :return '#DA7C4D'; 
          case 'ice'      :return '#75D0C1'; 
          case 'normal'   :return '#A0A29F'; 
          case 'poison'   :return '#B763CF'; 
          case 'psychic'  :return '#FA8581'; 
          case 'rock'     :return '#C9BB8A'; 
          case 'steel'    :return '#5695A3'; 
          case 'water'    :return '#539DDF'; 
      }
    }
  },
  mounted () {
    this.typeRelation = $types(this.type)
  }
}
</script>

<style lang="scss" scoped>
  .modal-type-container {
    display: flex;
    padding: $m;
    text-align: center;
    flex-direction: column;
    align-items: center;

    .type-icon-container {
      border-radius: 50%;
      margin: $m 0 $l 0;
      padding: $m;
        width: $xxl;
        height: $xxl;
      
      .type-icon {
        width: $xxl;
        height: $xxl;
      }
    }
    .type-title {
      margin-bottom: $l;
    }
    p {
      margin-bottom: $l;
    }
    .type-damage-relation-container {
      padding: $m;
      width: 100%;
      margin-bottom: $l;
      display: flex;
      justify-content: space-evenly;
    }
  }
</style>