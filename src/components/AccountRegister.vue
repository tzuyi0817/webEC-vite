<template>
  <div class="accountRegister commonForm">
    <fieldset>
      <input type="name" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
    </fieldset>

    <footer>
      <button>Register</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const store = useStore()

    store.commit('updateTitleName', '註冊')
  }
})
</script>