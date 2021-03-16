<template>
  <div v-if="isShow">
    <div class="header" :style="`opacity: ${scrollTop / 350}`">
      <span>{{ productName }}</span>
    </div>

    <button :class="{ 'defaultBtn': scrollTop < 175 }" @click="goBack" :style="`opacity: ${buttonOpacity}`">
      <icon name="angle-left" type="fas" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent ({
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const { state } = useStore()
    const $bus: any = inject('$bus')
    const notShow = ['Index', 'Category', 'Search']
    const scrollTop = ref(0)

    const isShow = computed(() => !notShow.includes($route.name as string))
    const buttonOpacity = computed(() => scrollTop.value < 175 ? 175 / (scrollTop.value + 175) : scrollTop.value / 175)
    const productName = computed(() => {
      const name = state.productName
      return name.length > 15 ? name.slice(0, 15) + '...' : name
    })

    $bus.$on('scroll', (top: number) => scrollTop.value = top)
    const goBack = () => $router.back()

    onUnmounted(() => $bus.$off('scroll'))
    return { goBack, isShow, productName, scrollTop, buttonOpacity }
  }
})
</script>

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
  span {
    font-size: 20px;
    padding: 0 20px 0 55px;
  }
}

button {
  z-index: 10;
  position: absolute;
  border-radius: 50%;
  padding: 3px 10px;
  background: #fff;
  top: 11px;
  left: 6%;
  svg {
    width: 12px;
    color: $baseColor;
  }
}

.defaultBtn {
  background: rgba(0, 0, 0, 0.26);
  svg {
    color: #fff;
  }
}
</style>