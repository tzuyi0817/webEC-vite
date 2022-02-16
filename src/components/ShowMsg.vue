<script setup lang="ts">
import { Types } from '@/types';
import { inject, onUnmounted, ref } from 'vue';

const $bus = inject('$bus') as Types.Bus;
const content = ref<HTMLElement | null>(null);
const showMsg = ref(false);
const func = ref<Function | null>(null);
const showCancel = ref(false);

$bus.$on('showMsg',({ html, fun, cancel }: { html: HTMLElement, fun: Function, cancel: boolean }) => {
  content.value = html;
  showMsg.value = true;
  func.value = fun;
  showCancel.value = cancel;
});

const showMsgFun = () => {
  func.value && func.value();
  showMsg.value = false;
  content.value = null;
  func.value = null;
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute('style', 'overflow:hidden;');
};
const closeMsgFun = () => showMsg.value = false;

onUnmounted(() => $bus.$off('showMsg'));
</script>

<template>
  <div class="showMsg lightBox" v-if="showMsg">
      <div class="showMsg__info">
        <div class="showMsg__content" v-html="content"></div>
        <div class="showMsg__btn">
          <button v-if="showCancel" @click="closeMsgFun">取消</button>
          <button @click="showMsgFun">確認</button>
        </div>
      </div>
  </div>
</template>

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
