<template>
  <div class="modal-container">
    <transition 
      name="slide-v" 
      appear
    >
      <div class="modal-window">
        <!-- <div class="modal-header">
          <div class="header-title">
            <slot name="header" />
          </div>
          <div
            @click="closeModal()"
            class="exit"
          >
            x
          </div>
        </div> -->
        <div class="modal-content">
          <slot name="content" />
        </div>
        <div 
          class="modal-close-container"
          @click="closeModal"
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
</template>

<script>
export default {
  name: 'BaseModal',
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
    min-height: 85vh;

    .modal-header {
      border-radius: 10px 10px 0 0;
      color: #fff;
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0px;

      .header-title {
        padding: 20px;
        font-weight: 300;
        color: #aaa;
        text-align: left;
        font-family: 'Roboto Condensed';
      }

      .exit {
        font-size: 20px;
        padding: 20px 30px;
      }
    }
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
        width: $xl;
        height: $xl;
        padding: $xxs;
        color: #fff;
        border-radius: 50%;
        color: $blue;
        border: 2px solid #999;

        .close-icon {
          background: #555;
          width: $l;
          height: $l;
          padding: $xs;
          border-radius: 50%;
        }
      }
    }
  }
}

</style>