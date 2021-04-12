<template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const store = useStore()


    store.commit('updateTitleName', '我')
  }
})
</script>