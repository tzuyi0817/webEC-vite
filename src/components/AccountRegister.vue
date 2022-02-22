<script setup lang="ts">
import { ref } from 'vue';
import { useGroupPathStore, useTitleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { showToast, ajax, getAjax } from '@/utils/common';

const emit = defineEmits(["changePage"]);
const groupPathStore = useGroupPathStore();
const titleStore = useTitleStore();
const { groupPath } = storeToRefs(groupPathStore);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const register = async () => {
  if (!name.value || !email.value || !password.value) {
    showToast('請輸入 Name 、 Email 和 Password');
    return;
  }

  if (password.value !== confirmPassword.value) {
    password.value = confirmPassword.value = '';
    showToast('輸入的 Password 和 Confirm Password 不相同');
    return;
  }

  const ajaxGroup = ajax(groupPath.value.platform + '/users/signUp', 'post');
  const setData = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirm: confirmPassword.value,
  };
  isLoading.value = true;

  const result = await getAjax(ajaxGroup, setData);
  isLoading.value = false;
  if (result.status == 'success') {
    showToast(result.message);
    emit('changePage');
  } else {
    password.value = confirmPassword.value = '';
    showToast('輸入的信箱已經註冊');
  }
};

titleStore.updateTitleName('註冊');
</script>

<template>
  <div class="accountRegister commonForm">
    <fieldset>
      <input type="name" name="name" placeholder="Name" v-model="name" />
      <input type="email" name="email" placeholder="Email" v-model="email" />
      <input type="password" name="password" placeholder="Password" v-model="password" />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" />
    </fieldset>

    <footer>
      <button @click="register" :disabled="isLoading">{{ isLoading ? '處理中...' : 'Register' }}</button>
    </footer>
  </div>
</template>