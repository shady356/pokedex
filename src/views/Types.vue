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

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/layout/Header.vue";
import TypesList from "@/components/types/TypesList.vue";
import TypeModal from "@/components/types/TypeModal.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import type { PokemonTypeName } from "@/helpers/types";

export default defineComponent({
  name: "Types",
  components: { Header, TypesList, TypeModal, BaseModal },
  data() {
    return {
      currentTypeInModal: null as PokemonTypeName | null,
      isTypeModalOpen: false,
    };
  },
  methods: {
    openTypeModal(type: PokemonTypeName) {
      this.isTypeModalOpen = true;
      this.currentTypeInModal = type;
    },
    closeTypeModal() {
      this.isTypeModalOpen = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.types-list-container {
  margin: $space-32 $space-16;
}
</style>
