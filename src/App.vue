<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const { ctx }: any = getCurrentInstance()
    const store = useStore()
    store.commit('updateGroupPath', ctx.$apiPrefixes)
  }
})
</script>

<style lang="scss">
#app {
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
