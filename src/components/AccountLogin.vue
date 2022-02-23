<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGroupPathStore, useUserStore, useCartStore, useTitleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { showToast, ajax, getAjax, LocalStorage } from '@/utils/common';

const groupPathStore = useGroupPathStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const titleStore = useTitleStore();
const { groupPath } = storeToRefs(groupPathStore);
const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const goIndex = () => router.push({ name: 'Index' });
const login = async () => {
  if (!email.value || !password.value) {
    showToast('請輸入 Email 和 Password');
    return
  }
  const ajaxGroup = ajax(groupPath.value.platform + '/users/logIn', 'post');
  const data = {
    email: email.value,
    password: password.value
  };
  isLoading.value = true;

  const result = await getAjax(ajaxGroup, data);
  isLoading.value = false;
  if (result?.status == 'success') {
    LocalStorage('set', 'token', result.token);
    LocalStorage('set', 'email', result.user.email);
    userStore.updateUser(result.user);
    LocalStorage('get', 'cartItem') && cartStore.updateCartCount();
    goIndex();
    showToast('登入成功');
  } else {
    password.value = '';
    showToast('輸入的信箱或密碼有誤');
  }
};

titleStore.updateTitleName('登入');
onMounted(() => {
  const localEmail = LocalStorage('get', 'email') as string;
  localEmail && (email.value = JSON.parse(localEmail));
});
</script>

<template>
  <div class="accountLogin commonForm">
    <fieldset>
      <input type="email" name="email" placeholder="Email" v-model="email" />
      <input type="password" name="password" placeholder="Password" v-model="password" />
    </fieldset>

    <footer>
      <p><a @click="goIndex">VIEW AS GUEST</a></p>
      <button @click="login" :disabled="isLoading">{{ isLoading ? '登入中...' : 'Login' }}</button>
    </footer>
  </div>
</template>