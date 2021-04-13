<template>
  <div class="showMsg lightBox" v-if="showMsg">
      <div class="showMsg__info">
        <div class="showMsg__content" v-html="html"></div>
        <div class="showMsg__btn">
          <button v-if="showCancel" @click="closeMsgFun">取消</button>
          <button @click="showMsgFun">確認</button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, toRefs, onUnmounted } from 'vue'

export default defineComponent({
  setup() {
    const $bus: any = inject('$bus')
    const data = reactive({
      html: undefined as unknown as HTMLElement,
      showMsg: false,
      fun: undefined as unknown as Function,
      showCancel: false
    })

    $bus.$on('showMsg',({ html, fun, cancel }: { html: HTMLElement, fun: Function, cancel: boolean }) => {
      data.html = html
      data.showMsg = true
      data.fun = fun
      data.showCancel = cancel
    })

    const showMsgFun = () => {
      data.fun && data.fun()
      data.showMsg = false
      data.html = undefined as unknown as HTMLElement
      data.fun = undefined as unknown as Function
      const body = document.getElementsByTagName('body')[0]
      body.setAttribute('style', 'overflow:hidden;')
    }
    const closeMsgFun = () => data.showMsg = false

    onUnmounted(() => $bus.$off('showMsg'))

    const resData = toRefs(data)
    return { ...resData, showMsgFun, closeMsgFun }
  }
})
</script>

<style lang="scss">
.showMsg {
  &__info {
    max-width: 375px;
    width: 100%;
    z-index: 1000;
    margin: auto 50px;
    user-select: none;
    background: #fff;
    border-radius: 4px;
  }

  &__content {
    text-align: center;
    padding: 26px 20px;
    font-size: 0.875rem;
  }

  &__btn {
    display: flex;
    align-content: space-between;
    button {
      line-height: 46px;
      background: transparent;
      border-top: 1px solid rgba(0, 0, 0, .09);
      flex: 1 100%;
      cursor: pointer;
      color: $baseColor;
      font-weight: 400;
      font-size: 1rem;
      border-radius: 0px;
      &:last-child {
        border-left: 1px solid rgba(0, 0, 0, .09);
      }
    }
  }
}
</style>
