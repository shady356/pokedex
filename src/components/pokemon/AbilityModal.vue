<template>
  <div class="modal-ability-container">
    <h3 class="ability-title capitalize">
      {{ abilityName.replace("-", " ") }}
    </h3>

    <template v-if="isLoading">
      <BaseProgressSpinner />
    </template>

    <template v-else-if="abilityData">
      <p class="description">
        {{ abilityData.effect }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from "vue";
import { useAbility } from "@/composables/usePokeApi";
import BaseProgressSpinner from "@/components/base/BaseProgressSpinner.vue";

const props = defineProps<{ abilityName: string }>();

const query = useAbility(toRef(props, "abilityName"));
const isLoading = query.isLoading;

const abilityData = computed(() => {
  const d = query.data.value;
  if (!d) return null;
  const flavorEntry = d.flavor_text_entries.find(
    (e: any) => e.language.name === "en",
  );
  const effectEntry = d.effect_entries.find(
    (e: any) => e.language.name === "en",
  );
  return {
    flavorText: flavorEntry
      ? flavorEntry.flavor_text.replace(/\n|\f/g, " ")
      : "",
    effect: effectEntry ? effectEntry.short_effect : "",
  };
});
</script>

<style lang="scss" scoped>
.modal-ability-container {
  display: flex;
  padding: $space-16 $space-24;
  text-align: center;
  flex-direction: column;
  align-items: center;
  min-height: 256px;

  .ability-title {
    margin-top: $space-24;
    margin-bottom: $space-16;
  }

  .description {
    margin-bottom: $space-24;
    color: var(--color-text-light);
    text-align: center;
    line-height: 22px;
  }
}
</style>
