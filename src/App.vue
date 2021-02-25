<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { ctx }: any = getCurrentInstance()
    const store = useStore()
    store.commit('updateGroupPath', ctx.$apiPrefixes)
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
