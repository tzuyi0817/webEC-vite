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
