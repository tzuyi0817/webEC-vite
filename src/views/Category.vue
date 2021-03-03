<template>
  <div class="category container">
    <nav-tabs :options="categories" @getId="getId" :isLoading="false" :nowId="categoryId" />

    <category-products :category="category" :isLoading="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as common from '/@/utils/common'
import NavTabs from '/@/components/NavTabs.vue'
import CategoryProducts from '/@/components/CategoryProducts.vue'

export default defineComponent ({
  components: {
    NavTabs,
    CategoryProducts
  },
  setup() {
    const groupPath = useStore().state.groupPath
    const $router = useRouter()
    const data = reactive({
      categories: [],
      category: {},
      isLoading: false,
      currentPage: 0,
      totalPage: 0,
      currentKey: '',
      currentValue: '',
      categoryId: +useRoute().params.id
    })

    const getCategory = (): void => {
      // const { key, value, page } = useRoute().query
      // const searchParams = new URLSearchParams({ key, value, page })
      const ajax = common.ajax(groupPath.platform + `/Category/${data.categoryId}`, 'get')
      data.isLoading = true

      common.getAjax(ajax).then((result: any) => {
        data.isLoading = false
        data.categories = result.categories
        data.category = result.category
        data.currentPage = result.page
        data.totalPage = result.totalPage.length
        data.currentKey = result.key
        data.currentValue = result.value
      })
    }
    const getId = (id: number) => {
      data.categoryId = id
      $router.push({ name: 'Category', params: { id } })
      getCategory()
    }

    onMounted(() => getCategory())
    const resData = toRefs(data)
    return { ...resData, getId }
  }
})
</script>