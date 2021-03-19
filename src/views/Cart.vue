<template>
  <div class="cart">

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const store = useStore()

    store.commit('updateTitleName', '購物車')
    return {  }
  }
})
</script>

<style lang="scss" scoped>

</style>