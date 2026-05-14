<template>
  <button
    v-if="type && displayName"
    class="type-tag-container"
    @click="click()"
  >
    <img
      :style="{ backgroundColor: getTypeColor() }"
      :src="getTypeIcon()"
      class="icon icon--skewed"
      alt="icon"
    />

    <div class="type-tag-container__text">
      {{ type }}
    </div>
  </button>

  <button v-else-if="type && !displayName" class="icon-button">
    <img
      :style="{ backgroundColor: getTypeColor() }"
      :src="getTypeIcon()"
      class="icon icon--circle"
      alt="icon"
    />
  </button>

  <div v-else class="type-tag-container">
    <div class="type-tag-container__empty-text">–</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { $getTypeColor } from "@/helpers/types";
import type { PokemonTypeName } from "@/helpers/types";

export default defineComponent({
  name: "BaseTypeTag",
  props: {
    type: {
      type: String as PropType<PokemonTypeName>,
      default: undefined,
    },
    displayName: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  methods: {
    click() {
      this.$emit("click");
    },
    getTypeColor(): string {
      return $getTypeColor(this.type as PokemonTypeName);
    },
    getTypeIcon(): string {
      return new URL(
        `../../assets/icons/types/${this.type}.svg`,
        import.meta.url,
      ).href;
    },
  },
});
</script>

<style lang="scss" scoped>
.type-tag-container {
  display: inline-flex;
  gap: $space-12;
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
    padding-right: $space-16;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: $font-xs;
  }

  &__empty-text {
    width: 100%;
    color: var(--color-text-light);
    padding: $space-4;
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
  width: $space-12;
  height: $space-12;
  padding: $space-8;
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
