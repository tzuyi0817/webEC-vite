<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" class="transition" />
      </transition>
    </router-view>  
    <show-toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ShowToast from './components/ShowToast.vue';

export default defineComponent ({
  components: {
    ShowToast
  },
  setup() {
    const $apiPrefixes = inject('$apiPrefixes')
    const store = useStore()
    const route = useRoute()
    const transitionName = ref('')

    store.commit('updateGroupPath', $apiPrefixes)
    watch((): any => route.path, (to, from) => {
      const toDepth = to.split('/').length
      const fromDepth = from.split('/').length
      transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    })
    return { transitionName }
  }
})
</script>

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
