<template>
  <div class="showToast lightBox" v-if="showToast">
    <div class="showToast__info">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs, onUnmounted } from 'vue'

export default defineComponent ({
  setup() {
    const $bus: any = inject('$bus')
    const data = reactive({ msg: '', showToast: false })

    $bus.$on('toast', (msg: string, callback: any) => {
      data.msg = msg
      data.showToast = true
      const time = msg.length > 15 ? 1500 : 1000

      setTimeout(() => {
        data.showToast = false
        data.msg = ''
      }, time)

      if (callback) callback()
    })

    onUnmounted(() => $bus.$off('toast'))

    const resData = toRefs(data)
    return { ...resData }
  }
})
</script>

<style lang="scss">
.showToast{
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  &__info {
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    background: rgba(#000, .6);
  }
}
</style>
