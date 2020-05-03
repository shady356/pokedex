<template>
  <div>

    <div class="header">
      <h5>Filter Pokémon</h5>
      <!-- <BaseButton
        class="ghost-white"
      >
        Reset
      </BaseButton> -->
    </div>

    <div class="filter-container">
    
      <ul class="filter-list">
        <li
          class="filter"
          v-for="(filter, index) in filters"
          :key="filter.name"
          @click="openFilter(index)"
        >
          <div :class="['text capitalize', {'open': filter.open} ]">
            {{filter.name}}
          </div>

          <div
            v-if="filter.children.length > 0 && filter.open"
            class="children-list"  
          >
            <BaseTag
              v-for="(child, childIndex) in filter.children" 
              :key="childIndex"
              :class="['child', {'purple': child.active} ]"
              @click="setFilter(child)"
            >
              {{child.name}}
            </BaseTag>
          </div>
        </li>
      </ul>

      <BaseButton 
        @click="applyFilters()"
        class="purple"
      >
        Apply filters
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseTag from '@/components/base/BaseTag.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'FilterPokemon',
  components: {
    BaseTag,
    BaseButton
  },
  data() {
    return {
      filters: [
        {
          name: 'generations',
          open: true,
          children: [
            {
              name: 'kanto',
              active: false
            },
            {
              name: 'johto',
              active: false
            },
            {
              name: 'hoenn',
              active: false
            },
            /* {
              name: 'sinnoh',
              active: false
            },
            {
              name: 'kalos',
              active: false
            } */
          ]
        },
        {
          name: 'types',
          open: false,
          children: [
            /* {
              name: 'bug',
              active: false
            },
            {
              name: 'dark',
              active: false
            },
            {
              name: 'dragon',
              active: false
            },
            {
              name: 'electric',
              active: false
            },
            {
              name: 'fairy',
              active: false
            },
            {
              name: 'fighting',
              active: false
            }, */
            {
              name: 'fire',
              active: false
            },
            /* {
              name: 'flying',
              active: false
            },
            {
              name: 'ghost',
              active: false
            },
            {
              name: 'grass',
              active: false
            },
            {
              name: 'ground',
              active: false
            },
            {
              name: 'ice',
              active: false
            },
            {
              name: 'normal',
              active: false
            },
            {
              name: 'poison',
              active: false
            },
            {
              name: 'psychic',
              active: false
            },
            {
              name: 'rock',
              active: false
            },
            {
              name: 'steel',
              active: false
            }, */
            {
              name: 'water',
              active: false
            }
          ]
        }
      ],
    }
  },
  methods: {
    openFilter(index) {
      this.filters.forEach(filter => {
        filter.open = false
      })
      this.filters[index].open = true
    },
    setFilter(child) {
      child.active = !child.active
    },
    getActiveFilters () {
      let activeFilters = {}

      this.filters.forEach(filter => {
        activeFilters[filter.name] = []
        filter.children.filter(child => {
          if (child.active) {
            activeFilters[filter.name].push(child.name)
          } 
        })
      })
      return activeFilters
    },
    applyFilters() {
      const filters = this.getActiveFilters()
      this.$emit('applyFilters', filters)
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: $s $l;
    background: $purple;
    color: #fff;
  }

  .filter-container {
    padding: $l;

    .filter-list {
      margin-bottom: $xl;

      .filter {
        border-bottom: 1px solid #eee;
        padding: $s 0;

        .text {

          &.open {
            font-weight: 700;
          }
        }
        
        .children-list {
          padding: $xs;
          display: flex;
          flex-wrap: wrap;

          .child {
            margin: $xs $xxs;
          }
        }
      }
    }

  }
</style>