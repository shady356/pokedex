<template>
  <div
    v-if="typeData"
    class="modal-type-container"
  >
    <div
      class="type-icon-container"
      :style="'background:' + getTypeColor(typeName)"
    >
      <img
        class="type-icon"
        :src="getIcon(typeName)"
        alt="type-icon"
      >
    </div>
    <h3 class="type-title uppercase">
      {{ typeName }}
    </h3>
    <p class="description">
      {{ typeData.description }}
    </p>

    <div class="type-damage-relation-container">
      <ul>
        <li>
          <h6 class="type-relation-title">
            Super effective against
          </h6>
          <div class="tag-types-container">
            <BaseTypeTag
              v-for="(typeItem, index) in typeData.superEffectiveTo"
              :key="index"
              :type="typeItem"
              class="tag-item"
            />
          </div>
        </li>
        <li>
          <h6 class="type-relation-title">
            Vulnerable to
          </h6>
          <div class="tag-types-container">
            <BaseTypeTag
              v-for="(typeItem, index) in typeData.vulnerableTo"
              :key="index"
              :type="typeItem"
              class="tag-item"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { $getTypeInfoByName, $getTypeColor } from "@/helpers/types.js";
import BaseTypeTag from "@/components/base/BaseTypeTag";
export default {
  name: "Type",
  components: {
    BaseTypeTag
  },
  props: {
    typeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      typeData: null
    };
  },
  methods: {
    getIcon(name) {
      return new URL(`../../assets/icons/types/${name}.svg`, import.meta.url).href;
    },
    getTypeColor(name) {
      return $getTypeColor(name)
    }
  },
  mounted() {
    this.typeData = $getTypeInfoByName(this.typeName);
  }
};
</script>

<style lang="scss" scoped>
.modal-type-container {
  display: flex;
  padding: $m;
  text-align: center;
  flex-direction: column;
  align-items: center;

  .type-icon-container {
    border-radius: 50%;
    margin: $m 0 $l 0;
    padding: $m;
    width: $xxl;
    height: $xxl;

    .type-icon {
      width: $xxl;
      height: $xxl;
    }
  }
  .type-title {
    margin-bottom: $m;
  }
  .description {
    margin-bottom: $l;
    color: var(--color-text-light);
    text-align: center;
    line-height: 22px;
  }
  .type-damage-relation-container {
    padding: $m;
    width: 100%;
    margin-bottom: $m;

    ul {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $m;

        .type-relation-title {
          text-align: left;
        }
        .tag-types-container {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          flex-wrap: wrap;

          .tag-item {
            margin-left: $xxs;

            &:first-child {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>