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
  mounted() {
    this.typeData = $getTypeInfoByName(this.typeName);
  },
  methods: {
    getIcon(name) {
      return new URL(`../../assets/icons/types/${name}.svg`, import.meta.url).href;
    },
    getTypeColor(name) {
      return $getTypeColor(name)
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-type-container {
  display: flex;
  padding: $space-16;
  text-align: center;
  flex-direction: column;
  align-items: center;

  .type-icon-container {
    border-radius: 50%;
    margin: $space-16 0 $space-24 0;
    padding: $space-16;
    width: $space-48;
    height: $space-48;

    .type-icon {
      width: $space-48;
      height: $space-48;
    }
  }
  .type-title {
    margin-bottom: $space-16;
  }
  .description {
    margin-bottom: $space-24;
    color: var(--color-text-light);
    text-align: center;
    line-height: 22px;
  }
  .type-damage-relation-container {
    padding: $space-16;
    width: 100%;
    margin-bottom: $space-16;

    ul {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $space-16;

        .type-relation-title {
          text-align: left;
        }
        .tag-types-container {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          flex-wrap: wrap;

          .tag-item {
            margin-left: $space-4;

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