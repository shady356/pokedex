<template>
  <div>
    <Header>
      <template #title>
        <h1>Types</h1>
      </template> 
    </Header>
    <div class="types-list-container">
      <TypesList 
        @select-type="openTypeModal"
      />
    </div>
    <BaseModal
      v-if="isTypeModalOpen"
      drag-handler
      @closeModal="closeTypeModal"
    >
      <TypeModal
        :type-name="currentTypeInModal"
      />
    </BaseModal>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import TypesList from "@/components/types/TypesList.vue";
import TypeModal from "@/components/types/TypeModal.vue";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  name: 'Types',
  components: {
    Header,
    TypesList,
    TypeModal,
    BaseModal
  },
  data () {
    return {
      currentTypeInModal: '',
      isTypeModalOpen: false
    }
  },
  methods: {
    openTypeModal(type) {
      this.isTypeModalOpen = true
      this.currentTypeInModal = type
    },
    closeTypeModal () {
      this.isTypeModalOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .types-list-container {
    margin: $xl $m;
  }
</style>