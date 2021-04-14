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

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import * as common from '../utils/common'

export default defineComponent ({
  emits: ['changePage'],
  setup(props, { emit }) {
    const store = useStore()
    const { groupPath } = store.state
    const data = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false
    })

    const register = async () => {
      if (!data.name || !data.email || !data.password) {
        common.showToast('請輸入 Name 、 Email 和 Password')
        return
      }

      if (data.password !== data.confirmPassword) {
        data.password = data.confirmPassword = ''
        common.showToast('輸入的 Password 和 Confirm Password 不相同')
      }

      const ajax = common.ajax(groupPath.platform + '/users/signUp', 'post')
      const setData = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword,
      }
      data.isLoading = true

      const result = await common.getAjax(ajax, setData)
      data.isLoading = false
      if (result.status == 'success') {
        common.showToast(result.message)
        emit('changePage')
      } else {
        data.password = data.confirmPassword = ''
        common.showToast('輸入的信箱已經註冊')
      }
    }

    store.commit('updateTitleName', '註冊')
    return { ...toRefs(data), register }
  }
})
</script>