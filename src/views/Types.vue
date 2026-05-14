<template>
  <div>
    <Header>
      <template #title>
        <h1>Types</h1>
      </template>
    </Header>
    <div class="types-list-container">
      <TypesList @select-type="openTypeModal" />
    </div>
    <BaseModal v-if="isTypeModalOpen" @close-modal="closeTypeModal">
      <TypeModal :type-name="currentTypeInModal!" />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/layout/Header.vue";
import TypesList from "@/components/types/TypesList.vue";
import TypeModal from "@/components/types/TypeModal.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import type { PokemonTypeName } from "@/helpers/types";

const currentTypeInModal = ref<PokemonTypeName | null>(null);
const isTypeModalOpen = ref(false);

function openTypeModal(type: string) {
  isTypeModalOpen.value = true;
  currentTypeInModal.value = type as PokemonTypeName;
}

function closeTypeModal() {
  isTypeModalOpen.value = false;
}
</script>

<style lang="scss" scoped>
.types-list-container {
  margin: $space-32 $space-16;
}
</style>
