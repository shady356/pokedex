<template>
  <div
    class="type-tag-container"
    :style="'backgroundColor:' + iconColor"
    @click="clicked()"
  >
    <img
      :src="icon"
      alt="icon"
      class="icon"
    >
  </div>
</template>

<script>
export default {
  name: "BaseTypeTag",
  props: {
    icon: {
      type: String,
      required: false,
      default: ""
    },
    iconColor: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods: {
    clicked() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.type-tag-container {
  display: inline-flex;
  width: $m;
  height: $m;
  padding: $xxs;
  border-radius: 50%;
  box-shadow: 0 $s #ffffff22 inset;
  align-items: center;
  justify-content: center;

  .icon {
    width: $s;
    height: $s;
  }

}
</style>