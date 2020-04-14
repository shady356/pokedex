<template>
  <div
    v-if="typeData"
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
    <p class="description">
      {{typeData.description}}
    </p>

    <div class="type-damage-relation-container">
      <ul>
        <li>
          <h6 class="type-relation-title">Super effective against</h6>
          <div class="tag-types-container">
            <BaseTag
              v-for="(typeItem, index) in typeData.superEffectiveTo"
              :key="index"
              :icon="getIcon(typeItem)"
              :iconColor="getTypeColor(typeItem)"
              class="tag-item"
            />
          </div>
        </li>
        <li>
          <h6 class="type-relation-title">Vulnerable to</h6>
          <div class="tag-types-container">
            <BaseTag
              v-for="(typeItem, index) in typeData.vulnerableTo"
              :key="index"
              :icon="getIcon(typeItem)"
              :iconColor="getTypeColor(typeItem)"
              class="tag-item"
            />
          </div>
        </li>
      </ul>
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
      typeData: null
    }
  },
  methods: {
    getIcon(name) {
      return require('@/assets/icons/types/' + name + '.svg')
    },
    getTypeColor (name) {
      switch(name) {
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
    this.typeData = $types(this.type)
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
    .description {
      margin-bottom: $l;
    }
    .type-damage-relation-container {
      padding: $m;
      width: 100%;
      margin-bottom: $l;

      ul {
        display: flex;
        flex-direction: column;

        li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: $l;

          .type-relation-title {
            text-align: left;
          }
          .tag-types-container {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            flex-wrap: wrap;

            .tag-item {
              margin-left: $s;

              &:first-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
</style>