<template>
  <img alt="Vue logo" src="/@/assets/logo.png" />
  <HelloWorld :msg="test" />
</template>

<script lang="ts">
import HelloWorld from "/@/components/HelloWorld.vue";
const test: string = '123'

export default {
  components: {
    HelloWorld,
  },
  setup() {
    return { test }
  }
};
</script>
