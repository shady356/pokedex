<template>
  <ul v-if="types" class="type-list">
    <li v-for="type in types" :key="type.name" class="type-item">
      <button class="type-item__button" @click="selectType(type.name)">
        <div class="type-item__icon" :style="getTypeBackground(type.color)">
          <img
            class="type-item__icon-image"
            :src="getTypeIcon(type.name)"
            alt=""
          />
        </div>
        <div class="type-item__title uppercase">
          {{ type.name }}
        </div>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { $getAllTypes, type TypeEntry } from "@/helpers/types";

const emit = defineEmits<{ "select-type": [typeName: string] }>();

const types = ref<TypeEntry[] | null>(null);

onMounted(() => {
  types.value = $getAllTypes();
});

function getTypeBackground(color: string) {
  return { "background-color": color };
}

function getTypeIcon(name: string): string {
  return new URL(`../../assets/icons/types/${name}.svg`, import.meta.url).href;
}

function selectType(typeName: string) {
  emit("select-type", typeName);
}
</script>

<style lang="scss" scoped>
.type-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $space-12;

  .type-item {
    width: 30%;
    margin-bottom: $space-12;

    &__button {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--color-accent-dim);
      width: 100%;
      padding: $space-12;
      box-sizing: border-box;
      border-radius: $space-12;
      border: none;
      cursor: pointer;
      color: inherit;
      font: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    &__icon {
      margin-bottom: $space-8;
      width: $space-16;
      height: $space-16;
      padding: $space-12;
      border-radius: 50%;
    }
    &__icon-image {
      width: 100%;
      height: 100%;
    }
    &__title {
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
