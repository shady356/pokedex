<template>
  <transition name="fade" appear>
    <div
      class="modal-container"
      @touchmove.passive="movingHandler"
      @touchend="endHandler"
    >
      <transition name="slide-v" appear>
        <div
          id="moving-box"
          :class="['modal-window', { 'is-pokemon-card': isPokemonCard }]"
        >
          <div v-if="dragHandler" class="drag-handler" />
          <slot />
          <div
            v-if="showCloseButton"
            class="modal-close-container"
            @click="closeModal"
          >
            <div class="modal-close">
              <img
                class="close-icon"
                src="@/assets/icons/clear-24px.svg"
                alt="clear icon"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    showCloseButton?: boolean;
    isPokemonCard?: boolean;
    dragHandler?: boolean;
  }>(),
  { showCloseButton: true, isPokemonCard: false, dragHandler: false },
);
const emit = defineEmits<{ closeModal: [] }>();

const toPositionPercentage = ref(0);
const thresholdExpandPercentage = 75;
const thresholdClosePercentage = 50;

document.body.classList.add("disable-scroll");
onUnmounted(() => {
  setTimeout(() => {
    document.body.classList.remove("disable-scroll");
  }, 100);
});

function movingHandler(e: TouchEvent) {
  if (props.dragHandler) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    const moving = e.changedTouches[0].clientY;
    const clientHeight = document.documentElement.clientHeight;
    const toPositionPx = clientHeight - moving;
    toPositionPercentage.value = ((moving / clientHeight) * 100 - 100) * -1;
    document.getElementById("moving-box")!.style.height = toPositionPx + "px";
  }
}

function endHandler() {
  if (props.dragHandler) {
    if (
      toPositionPercentage.value < thresholdClosePercentage &&
      toPositionPercentage.value !== 0
    ) {
      closeModal();
    } else if (
      toPositionPercentage.value > thresholdExpandPercentage &&
      toPositionPercentage.value !== 0
    ) {
      snapToPosition("98%");
    } else {
      snapToPosition("initial");
    }
  }
}

function snapToPosition(value: string) {
  document.getElementById("moving-box")!.style.height = value;
}

function closeModal() {
  emit("closeModal");
}
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
    background: var(--color-bg-primary);
    color: var(--color-text);
    bottom: 0;
    left: 2vw;
    width: 96vw;
    max-height: 100vh;
    min-height: 30vh;
    border-radius: $space-16 $space-16 0 0;

    .drag-handler {
      position: sticky;
      top: $space-12;
      margin: $space-12 auto 0;
      background: var(--color-bg-tertiary);
      width: $space-48;
      height: $space-4;
      border-radius: $space-24;
    }

    @media (min-width: 1024px) {
      width: 50vw;
      height: 50vh;
      top: 25vh;
      left: 25vw;
      border-radius: $space-16;
    }

    &.is-pokemon-card {
      width: 98vw;
      bottom: 1vh;
      left: 1vw;
      height: 98vh;
      border-radius: $space-16;

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
      left: calc(50% - #{$space-48} / 2);
      z-index: 10;
      width: $space-48;
      height: $space-48;

      .modal-close {
        display: flex;
        justify-content: center;
        background: var(--color-bg-primary);
        border-radius: 50%;
        padding: $space-2;

        .close-icon {
          background: var(--color-primary);
          width: $space-24;
          height: $space-24;
          padding: $space-8;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
