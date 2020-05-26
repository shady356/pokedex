<template>
  <div
    class="type-tag-container"
    :style="'backgroundColor:' + getTypeColor()"
    @click="clicked()"
  >
    <img
      :src="getTypeIcon()"
      alt="icon"
      class="icon"
    >
  </div>
</template>

<script>
import { $getTypeColor } from "@/helpers/types.js";
export default {
  name: "BaseTypeTag",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    clicked() {
      this.$emit("click");
    },
    getTypeColor () {
      return $getTypeColor(this.type)
    },
    getTypeIcon() {
      return require("@/assets/icons/types/" + this.type + ".svg");
    },
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