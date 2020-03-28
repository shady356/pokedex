<template>
  <div class="modal-container">
    <transition 
      name="slide-v" 
      appear
    >
      <div class="modal-window">
        <div class="modal-header">
          <div class="header-title">
            <slot name="header" />
          </div>
          <div
            @click="closeModal()"
            class="exit"
          >
            x
          </div>
        </div>
        <div class="modal-content">
          <slot name="content" />
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
      border-radius: 10px 10px 0 0;
      bottom: 0;
      border-radius: 20px 20px 0 0;
      width: 100vw;
      max-height: 90vh;
      padding-bottom: 1rem;
      background-image: linear-gradient(180deg, hsla(305, 78%, 9%, 0.85), hsla(268, 87%, 3%, 0.85));

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

    }

  }

</style>