<script setup lang="ts">
import { Types } from '@/types';
import { computed, inject, onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore, useTitleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { showToast } from '@/utils/common';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const titleStore = useTitleStore();
const { titleName } = storeToRefs(titleStore);
const $bus = inject('$bus') as Types.Bus;
const notShow = ['Index', 'Search'];
const scrollTop = ref(350);
const isProfile = ref(false);

const isShow = computed(() => {
  isProfile.value = route.name == 'UserProfile';
  scrollTop.value = route.name == 'Product' ? 0 : 350;
  return !notShow.includes(route.name as string);
})
const buttonOpacity = computed(() => scrollTop.value < 175 ? 175 / (scrollTop.value + 175) : scrollTop.value / 350);
const title = computed(() => {
  const name = titleName.value;
  return name.length > 15 ? name.slice(0, 15) + '...' : name;
});

$bus.$on('scroll', (top: number) => scrollTop.value = top);
const goBack = () => router.back();
const logout = () => {
  userStore.emptyUser();
  router.push({ name: 'Account' });
  showToast('已成功登出');
};

onUnmounted(() => $bus.$off('scroll'));
</script>

<template>
  <div v-if="isShow">
    <div class="header" :style="`opacity: ${scrollTop / 350}`">
      <span>{{ title }}</span>
    </div>

    <button :class="{ 'defaultBtn': scrollTop < 175 }" @click="goBack" :style="`opacity: ${buttonOpacity}`">
      <icon name="angle-left" type="fas" />
    </button>

    <button class="logoutBtn" v-if="isProfile" @click="logout">
      <icon name="sign-out-alt" type="fas" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.header {
  z-index: 10;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 10px 6%;
  background: #fff;
  height: 55px;
  box-shadow: 0 0 0.375rem 0 rgb(0 0 0 / 6%);
  span {
    width: 100%;
    font-size: 20px;
    padding: 0 40px;
  }
}

button {
  z-index: 10;
  position: absolute;
  border-radius: 50%;
  padding: 3px 10px;
  background: transparent;
  top: 11px;
  left: 6%;
  svg {
    width: 12px;
    color: $baseColor;
  }
}

.logoutBtn {
  left: 85%;
  svg {
    width: 24px;
  }
}

.defaultBtn {
  background: rgba(0, 0, 0, 0.26);
  svg {
    color: #fff;
  }
}
</style>