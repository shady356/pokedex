<template>
  <transition
    name="fade"
    appear
  >
    <div class="modal-container">
      <transition
        :name="isPokemonCard ? '' : 'slide-v'"
        appear
      >
        <div :class="['modal-window', { 'is-pokemon-card': isPokemonCard }]">
          <slot />
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
  name: "BaseModal",
  props: {
    showCloseButton: {
      type: Boolean,
      required: false,
      default: true
    },
    isPokemonCard: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    document.body.classList.add("disable-scroll");
  },
  destroyed() {
    document.body.classList.remove("disable-scroll");
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  background: hsla(0, 0%, 0%, 0.75);
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
    width: 100vw;
    max-height: 100vh;
    min-height: 30vh;
    border-radius: $m $m 0 0;

    @media (min-width: 1024px) {
      width: 50vw;
      height: 50vh;
      top: 25vh;
      left: 25vw;
      border-radius: $m;
    }

    &.is-pokemon-card {
      width: 94vw;
      bottom: 2vh;
      left: 3vw;
      height: 96vh;
      border-radius: $m;

      .modal-close-container {
        bottom: 3vh;
      }

      @media (min-width: 1024px) {
        height: 96vh;
        width: 30vw;
        left: 35vw;
        top: 2vh;
      }
    }

    .modal-close-container {
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 2vh;
      left: 0;
      right: 0;
      z-index: 10;

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