<template>
  <transition
    name="fade"
    appear
  >
    <div
      class="modal-container"
      v-touch:moving="movingHandler"
      v-touch:end="endHandler"
    >
      <transition
        name="slide-v"
        appear
      >
        <div
          id="moving-box"
          :class="['modal-window', { 'is-pokemon-card': isPokemonCard }]"
        >
          <div
            v-if="dragHandler"
            class="drag-handler"
          />
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
    },
    dragHandler: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      toPositionPercentage: 0,
      thresholdExpandPercentage: 75,
      thresholdClosePercentage: 50
    }
  },
  created() {
    document.body.classList.add("disable-scroll");
  },
  destroyed() {
    setTimeout(() => {
      document.body.classList.remove("disable-scroll");
    }, 100)
  },
  methods: {
    movingHandler (e) {
      const moving = e.changedTouches[0].clientY
      const clientHeight = document.documentElement.clientHeight
      const toPositionPx = clientHeight - moving
      this.toPositionPercentage = ((moving / clientHeight * 100) - 100 ) * -1
      document.getElementById('moving-box').style.height = toPositionPx + 'px'
    },
    endHandler() {
      if (this.toPositionPercentage < this.thresholdClosePercentage && this.toPositionPercentage !==0) {
        this.closeModal()
      }
      else if (this.toPositionPercentage > this.thresholdExpandPercentage && this.toPositionPercentage !==0) {
        this.snapToPosition('98%')
      }
      else {
        this.snapToPosition('initial')
      }
    },
    snapToPosition (value) {
      document.getElementById('moving-box').style.height = value
    },
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
    left: 2vw;
    width: 96vw;
    max-height: 100vh;
    min-height: 30vh;
    border-radius: $m $m 0 0;

    .drag-handler {
      position: sticky;
      top: $s;
      margin: $s auto 0;
      background: #aaa;
      width: $xxl;
      height: $xxs;
      border-radius: $l;
    }

    @media (min-width: 1024px) {
      width: 50vw;
      height: 50vh;
      top: 25vh;
      left: 25vw;
      border-radius: $m;
    }

    &.is-pokemon-card {
      width: 98vw;
      bottom: 1vh;
      left: 1vw;
      height: 98vh;
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
      align-items: center;
      position: fixed;
      bottom: 2vh;
      left: calc(50% - #{$xxl} / 2);
      z-index: 10;
      width: $xxl;
      height: $xxl;

      .modal-close {
        display: flex;
        justify-content: center;
        background: #fff;
        border: 1px solid var(--main-color-navigation);
        border-radius: 50%;
        padding: $xxxs;

        .close-icon {
          background: var(--main-color-navigation);
          width: $l;
          height: $l;
          padding: $xs;
          border-radius: 50%;
        }
      }
    }
  }
}

.dark {
  .modal-window {
    background: #333;
    color: #ddd;
  }
}
</style>