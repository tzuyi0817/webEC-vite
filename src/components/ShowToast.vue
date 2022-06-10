<script setup lang="ts">
import type { Types } from '@/types';
import { inject, ref, onUnmounted } from 'vue'

const $bus = inject<Types.Bus>('$bus');
const content = ref('');
const showToast = ref(false);

$bus?.$on('toast', (msg: string, callback: Function | undefined) => {
  content.value = msg;
  showToast.value = true;
  const time = msg.length > 15 ? 1500 : 1000;

  setTimeout(() => {
    showToast.value = false;
    content.value = '';
  }, time);

  callback && callback();
})

onUnmounted(() => $bus?.$off('toast'));
</script>

<template>
  <div class="showToast lightBox" v-if="showToast">
    <div class="showToast__info">{{ content }}</div>
  </div>
</template>

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
