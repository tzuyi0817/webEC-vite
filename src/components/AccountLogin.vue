<template>
  <div class="accountLogin commonForm">
    <fieldset>
      <input type="email" name="email" placeholder="Email" v-model="email" required />
      <input type="password" name="password" placeholder="Password" v-model="password" required />
    </fieldset>

    <footer>
      <button @click="login" :disabled="isLoading">{{ isLoading ? '登入中...' : 'Login' }}</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as common from '../utils/common'

export default defineComponent ({
  setup() {
    const store = useStore()
    const { groupPath } = store.state
    const $router = useRouter()
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)

    const login = async() => {
      if (!email.value || !password.value) {
        common.showToast('請填入 email 和 password')
        return
      }
      const ajax = common.ajax(groupPath.platform + '/users/logIn', 'post')
      const data = {
        email: email.value,
        password: password.value
      }
      isLoading.value = true

      const result = await common.getAjax(ajax, data)
      isLoading.value = false
      if (result.status == 'success') {
        common.LocalStorage('set', 'token', result.token)
        store.commit('updateUser', result.user)
        $router.push({ name: 'Index' })
        common.showToast('登入成功')
      } else {
        password.value = ''
        common.showToast('輸入的信箱或密碼有誤')
      }
    }

    store.commit('updateTitleName', '登入')
    return { login, email, password, isLoading }
  }
})
</script>