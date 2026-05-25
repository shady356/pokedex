<template>
  <select
    class="base-select"
    @change="changeValue"
  >
    <option
      v-if="placeholder"
      value=""
    >
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
export type optionsType = {
  value: string;
  label: string;
};

defineProps<{
  options: optionsType[];
  placeholder?: string;
}>();

const emits = defineEmits<{
  (event: 'change', value: string): void;
}>();

const changeValue = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emits('change', target.value);
};
</script>

<style lang="scss" scoped>
.base-select {
	width: 100%;
	padding: $space-16;
	border-radius: 32px;
	font-size: $font-14;
	border: none;
	color: var(--color-text);
	background-color: var(--color-bg-secondary);

	cursor: pointer;
}
</style>