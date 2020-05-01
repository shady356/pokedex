<template>
  <transition
    name="fade"
    appear
  >
  <div class="modal-container">
    <transition 
      name="slide-v"
      appear
    >
      <div class="modal-window">

        <div class="modal-content">
          <slot name="content" />
        </div>

        <div 
          class="modal-close-container"
          @click="closeModal"
          v-if="showCloseButton"
        >
          <div class="modal-close">
            <img
              class="close-icon"
              src="@/assets/icons/clear-24px.svg"
              alt="clear icon"
            >
          </div>
        </div>

      </div>
    </transition>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    showCloseButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  mounted () {
    document.body.classList.add('disable-scroll')
  },
  destroyed () {
    document.body.classList.remove('disable-scroll')
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-container {
  background: hsla(0,0%,0%,.75);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  .modal-window {
    position: fixed;
    overflow-y: auto;
    background: #fff;
    color: #333;
    bottom: 0;
    border-radius: $m $m 0 0;
    width: 100vw;
    max-height: 86vh;
    min-height: 30vh;

    .modal-close-container {
      display: flex;
      justify-content: center;
      position:fixed;
      bottom: 2vh;
      left: 0;
      right: 0;
      
      .modal-close {
        display: flex;
        justify-content: center;
        border: 1px solid #aaa;
        border-radius: 50%;
        padding: $xxxs;

        .close-icon {
          background: #555;
          width: $m;
          height: $m;
          padding: $xs;
          border-radius: 50%;
        }
      }
    }
  }
}

</style>