<template>
  <div class="tag-container">
    <div
      v-if="icon" 
      class="icon-container"
      :style="'backgroundColor:' + iconColor"
    >
      <img 
        :src="icon" 
        alt="icon"
        class="icon"
      >
    </div>
    <div class="title uppercase condensed">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTag',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    iconColor: {
      type:String,
      required: false,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
  .tag-container {
    display: flex;
    align-items: center;
    background: #333;
    color: #fff;
    border-radius: $xs;

    .icon-container {
      padding: $xs $s;
      background: #08a;
      border-radius: $xs 0 0 $xs;

      .icon {
        width: $font-s;
        height: $font-s;
      }
    }
    .title {
      padding: $xs $s;
      font-size: $font-s;
    }
  }
</style>