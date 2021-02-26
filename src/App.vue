<template>
  <div id="app">
    <router-view />
    <show-toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
import ShowToast from './components/ShowToast.vue';

export default defineComponent ({
  components: {
    ShowToast
  },
  setup() {
    const $apiPrefixes = inject('$apiPrefixes')
    const store = useStore()
    store.commit('updateGroupPath', $apiPrefixes)
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
