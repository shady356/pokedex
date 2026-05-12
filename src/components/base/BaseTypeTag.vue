<template>
  <button
    v-if="type && displayName"
    class="type-tag-container"
    @click="click()"
  >
    <img
      :style="'backgroundColor:' + getTypeColor()"
      :src="getTypeIcon()"
      class="icon icon--skewed"
      alt="icon"
    >
    
    <div class="type-tag-container__text">
      {{ type }}
    </div>
  </button>
  
  <button
    v-else-if="type && !displayName"
    class="icon-button"
  >
    <img
      :style="'backgroundColor:' + getTypeColor()"
      :src="getTypeIcon()"
      class="icon icon--circle"
      alt="icon"
    >
  </button>
  
  <div
    v-else
    class="type-tag-container"
  >
    <div class="type-tag-container__empty-text">
      –
    </div>
  </div>
</template>

<script>
import { $getTypeColor } from "@/helpers/types.js";


export default {
  name: "BaseTypeTag",
  components: {
  
  },
  props: {
    type: {
      type: String,
      required: false,
      default: undefined
    },
    displayName: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isModalOpen: false,
    }
  },
  methods: {
    click() {
      this.$emit('click')
    },

    getTypeColor() {
      return $getTypeColor(this.type);
    },

    getTypeIcon() {
      return new URL(
        `../../assets/icons/types/${this.type}.svg`,
        import.meta.url,
      ).href;
    },
  },
};
</script>

<style lang="scss" scoped>
.type-tag-container {
  display: inline-flex;
  gap: $s;
  border: none;
  background: none;
  border-radius: 8px;
  align-items: center;
  justify-content: flex-start;
  background: var(--color-bg-secondary);
  font-family: Roboto Condensed;
  cursor: pointer;

  &__text {
    color: var(--color-text-light);
    padding-right: $m;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: $font-xs;
  }

  &__empty-text {
    width: 100%;
    color: var(--color-text-light);
    padding: $xxs;
    font-weight: 700;
    text-align: center;
  }
}

.icon-button {
  background: none;
  border: none;
}

 .icon {
  display: flex;
  background: none;
  width: $s;
  height: $s;
  padding: $xs;
  border-radius: 8px 0 0 8px;

  &--circle {
    border-radius: 50%;
  }

  &--skewed {
    clip-path: polygon(0 0, 100% 0, 75% 100%, 0% 100%);
    padding-right: 16px;
    padding-left: 12px;
  }
}
</style>
