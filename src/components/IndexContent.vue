<template>
  <div class="indexContent">
    <p>{{ content }}</p>
    <a :href="url" @click="goLink(url)"><img :src="category.image"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, watch, toRefs } from 'vue'
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
    const router = useRouter()
    const data = reactive({ category: { id: 0 } })
    const contentData = [
      '烘焙咖啡使咖啡生豆的化學與物理性質轉變為已烘焙的咖啡製品',
      '葡萄酒是用新鮮葡萄果實或葡萄汁，經過發酵釀製而成的酒精飲料',
      '不使用化學合成農藥、化學合成肥料、基因改造生物、動物及植物生長調節劑等非天然物質的農產品'
    ]

    const url = computed(() => `/category/${data.category.id}`)
    const content = computed(() => contentData[data.category.id - 1])
    const goLink = (url: string) => router.push(url)

    watch(() => props.category, (val: categoryType) => data.category = val)

    const resultData = toRefs(data)
    return { ...resultData, url, goLink, content }
  }
})
</script>

<style lang="scss" scoped>
.indexContent {
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>