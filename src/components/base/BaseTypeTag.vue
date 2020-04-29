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
    border-radius: $xs;

    .icon-container {
      padding: $xs $s;
      border-radius: 50%;

      .icon {
        width: $font-s;
        height: $font-s;
      }
    }
    &.has-title {
      background: #333;

      .icon-container {
        border-radius: $xs 0 0 $xs;
      }
      .title {
        padding: $xs $s;
        font-size: $font-s;
      }
    }
  }
</style>