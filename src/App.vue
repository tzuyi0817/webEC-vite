<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useGroupPathStore, useUserStore, useCartStore } from '@/store';
import { useRoute } from 'vue-router';
import ShowToast from '@/components/ShowToast.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ShowMsg from '@/components/ShowMsg.vue';

const $apiPrefixes = inject('$apiPrefixes');
const groupPathStore = useGroupPathStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const route = useRoute();
const transitionName = ref('');

groupPathStore.updateGroupPath($apiPrefixes);
localStorage.getItem('token') && userStore.getUser();
localStorage.getItem('cartItem') && cartStore.updateCartCount();
watch(() => route.path, (to, from) => {
  const toDepth = to.split('/').length;
  const fromDepth = from.split('/').length;
  transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});
</script>

<template>
  <div id="app">
    <Header />
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" class="transition" />
      </transition>
    </router-view>
    <Footer />
    <show-toast />
    <show-msg />
  </div>
</template>

<style lang="scss">
#app {
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

.transition {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(75%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-75%, 0);
}
</style>
