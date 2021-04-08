<template>
  <div class="accountLogin commonForm">
    <fieldset>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
    </fieldset>

    <footer>
      <button>Login</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const store = useStore()

    store.commit('updateTitleName', '登入')
  }
})
</script>