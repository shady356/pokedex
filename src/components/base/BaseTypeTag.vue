<template>
  <div 
    :class="['type-tag-container', {'has-title': title}]" 
    @click="clicked()"
  >
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
    <div
      v-if="title" 
      class="title uppercase condensed">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTypeTag',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
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
  methods: {
    clicked () {
      this.$emit('click')
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .type-tag-container {
    display: inline-flex;
    align-items: center;
    color: #fff;
    border-radius: $xxs;

    .icon-container {
      padding: $xxs $xs;
      border-radius: 50%;
      box-shadow: 0 $s #ffffff22 inset;

      .icon {
        width: $font-s;
        height: $font-s;
      }
    }
    &.has-title {
      background: #333;
      box-shadow: 0 $s #ffffff22 inset;

      .icon-container {
        border-radius: $xxs 0 0 $xxs;
      }
      .title {
        padding: $xxs $xs;
        font-size: $font-s;
      }
    }
  }
</style>