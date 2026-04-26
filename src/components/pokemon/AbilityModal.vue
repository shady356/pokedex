<template>
  <div class="modal-ability-container">
    <h3 class="ability-title capitalize">
      {{ abilityName.replace('-', ' ') }}
    </h3>

    <template v-if="isLoading">
      <BaseProgressSpinner />
    </template>

    <template v-else-if="abilityData">
      <p class="description">
        {{ abilityData.flavorText }}
      </p>
      <div
        v-if="abilityData.effect"
        class="effect-container"
      >
        <p class="effect-text">
          {{ abilityData.effect }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { toRef, computed } from 'vue'
import { useAbility } from '@/composables/usePokeApi.js'
import BaseProgressSpinner from '@/components/base/BaseProgressSpinner.vue'

export default {
  name: 'AbilityModal',
  components: { BaseProgressSpinner },
  props: {
    abilityName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const name = toRef(props, 'abilityName')
    const query = useAbility(name)

    const abilityData = computed(() => {
      const d = query.data.value
      if (!d) return null
      const flavorEntry = d.flavor_text_entries.find(e => e.language.name === 'en')
      const effectEntry = d.effect_entries.find(e => e.language.name === 'en')
      return {
        flavorText: flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, ' ') : '',
        effect: effectEntry ? effectEntry.short_effect : '',
      }
    })

    return {
      abilityData,
      isLoading: query.isLoading,
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-ability-container {
  display: flex;
  padding: $m $l;
  text-align: center;
  flex-direction: column;
  align-items: center;
  min-height: 350px;

  .ability-title {
    margin-top: $l;
    margin-bottom: $m;
  }

  .description {
    margin-bottom: $l;
    color: #4d4d4d;
    text-align: center;
    line-height: 22px;
  }

  .effect-container {
    
    background-color: #f5f5f5;
    padding: $xl $l;
    border: 1px dashed #ddd;
    text-align: center;
    border-radius: 16px;

    .effect-text {
      font-size: $font-s;
      line-height: 20px;
      color: #333;
    }
  }
}

.dark {
  .modal-ability-container {
    .description {
      color: #ddd;
    }

    .effect-container {
      .effect-title {
        color: #aaa;
      }

      .effect-text {
        color: #ddd;
      }
    }
  }
}
</style>
