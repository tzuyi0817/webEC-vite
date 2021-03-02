<template>
  <div class="indexContent fade">
    <p>{{ content }}</p>
    <a :href="url" @click="goLink(url)">
      <img :src="category && category.image">
      <p>前往 {{ category && category.name }} 頁面 >></p>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface categoryType {
  id: number
  createdAt: string
  StoreId: number
  image: string
  name: string
  updatedAt: string
}

export default defineComponent ({
  props: {
    category: Object
  },
  setup(props) {
    const $router = useRouter()
    const nowId = ref(1)
    const contentData = [
      '烘焙咖啡使咖啡生豆的化學與物理性質轉變為已烘焙的咖啡製品',
      '葡萄酒是用新鮮葡萄果實或葡萄汁，經過發酵釀製而成的酒精飲料',
      '不使用化學合成農藥、化學合成肥料、基因改造生物、動物及植物生長調節劑等非天然物質的農產品'
    ]

    const url = computed(() => `/category/${nowId.value}`)
    const content = computed(() => contentData[nowId.value - 1])
    const goLink = (url: string) => $router.push(url)

    watch((): any => props.category, (val: categoryType) => nowId.value = val.id )

    return { nowId, url, goLink, content }
  }
})
</script>

<style lang="scss" scoped>
.indexContent {
  p {
    padding: 10px 5px;
    font-weight: bold;
    color: $baseColor;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>