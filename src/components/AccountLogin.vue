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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import * as common from '../utils/common';

const store = useStore();
const { groupPath } = store.state;
const router = useRouter()
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const goIndex = () => router.push({ name: 'Index' });
const login = async () => {
  if (!email.value || !password.value) {
    common.showToast('請輸入 Email 和 Password');
    return
  }
  const ajax = common.ajax(groupPath.platform + '/users/logIn', 'post');
  const data = {
    email: email.value,
    password: password.value
  };
  isLoading.value = true;

  const result = await common.getAjax(ajax, data);
  isLoading.value = false;
  if (result.status == 'success') {
    common.LocalStorage('set', 'token', result.token);
    common.LocalStorage('set', 'email', result.user.email);
    store.commit('updateUser', result.user);
    common.LocalStorage('get', 'cartItem') && store.commit('updateCartCount');
    goIndex();
    common.showToast('登入成功');
  } else {
    password.value = '';
    common.showToast('輸入的信箱或密碼有誤');
  }
};

store.commit('updateTitleName', '登入');
onMounted(() => {
  const localEmail = common.LocalStorage('get', 'email') as string;
  localEmail && (email.value = JSON.parse(localEmail));
});
</script>