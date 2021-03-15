<template>
  <div v-if="isShow">
    <div class="header" :style="`opacity: ${scrollTop / 350}`">
      <button v-if="scrollTop > 175" @click="goBack"><icon name="angle-left" type="fas" /></button>
      <span>{{ productName }}</span>
    </div>

    <button v-if="scrollTop < 175" class="defaultBtn" @click="goBack" :style="`opacity: ${175 / scrollTop + 1}`">
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
    const productName = computed(() => {
      const name = state.productName
      return name.length > 15 ? name.slice(0, 15) + '...' : name
    })

    $bus.$on('scroll', (top: number) => scrollTop.value = top)
    const goBack = () => $router.back()

    onUnmounted(() => $bus.$off('scroll'))
    return { goBack, isShow, productName, scrollTop }
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
  button {
    background: #fff;
    svg {
      color: $baseColor;
    }
  }

  span {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 20px;
    padding: 0 20px;
  }
}

.defaultBtn {
  z-index: 10;
  position: absolute;
  background: rgba(0, 0, 0, 0.26);
  top: 10px;
  left: 6%;
  svg {
    color: #fff;
  }
}

button {
  border-radius: 50%;
  padding: 3px 10px;
  svg {
    width: 12px;
  }
}
</style>