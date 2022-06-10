<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="$props.class"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <path fill="currentColor" :d="svgPath" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { IconPrefix, IconName } from '@fortawesome/fontawesome-common-types';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "fas",
      required: false
    },
    class: String
  },
  setup(props) {
    const definition = computed(() =>
      findIconDefinition({
        prefix: props.type as IconPrefix,
        iconName: props.name as IconName
      })
    );

    const width = computed(() => definition.value.icon[0]);
    const height = computed(() => definition.value.icon[1]);
    const svgPath = computed(() => definition.value.icon[4] as string);

    return { width, height, svgPath };
  }
})
</script>