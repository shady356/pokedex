<template>
  <ul class="navigation-list">
    <router-link
      class="item"
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.route }"
      tag="li"
    >
      <div class="icon-container">
        <img 
          class="icon-image"
          :src="item.icon" 
          alt="item icon"
        >
      </div>
      <div class="text uppercase letter-spacing">
        {{ item.name }}
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'MainMenuItems',
  props: {
    items: {
      type: Array,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
  .navigation-list {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    @media screen and (min-width: 1024px) {
      width: 50%;
    }

    .item {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: $l;
      transition: all 0.4s;
      width: calc(100% / 3);

      .icon-container {
        align-items: center;
        background: $body-color-accent;
        //border: 2px solid $body-color-accent-2;
        border-radius: 50%;
        display: flex;
        height: $xxxl;
        justify-content: center;
        width: $xxxl;

        .icon-image {
          height: $xl;
          width: $xl;
        }
      }
      .text {
        color: $body-color-text;
        font-size: $font-s;
        font-weight: 700;
        margin-top: $s;
        text-align: center;
      }
    }
  }

  .dark {
    .navigation-list {
      .icon-container {
        background: #333;
        border: 1px solid #444;
      }
      .text {
        color: #aaa;
      }
    }
  }
</style>