<template>
  <div class="category container" @scroll.passive="handerScroll">
    <nav-tabs :options="categories" @getId="getId" :isLoading="false" :nowId="categoryId" />

    <category-products :category="category" :isLoading="isLoading" @getSelquery="getSelquery" :products="products" :loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import * as common from '../utils/common'
import NavTabs from '../components/NavTabs.vue'
import CategoryProducts from '../components/CategoryProducts.vue'
import { queryType } from '../utils/interface'

export default defineComponent ({
  components: {
    NavTabs,
    CategoryProducts
  },
  setup() {
    const state = useStore()
    const { groupPath } = useStore().state
    const $router = useRouter()
    const data = reactive({
      categories: [],
      category: {},
      products: [],
      isLoading: false,
      currentPage: 1,
      totalPage: 0,
      currentKey: '',
      currentValue: '',
      categoryId: +useRoute().params.id,
      loadMore: false
    })

    const getCategory = (): void => {
      const searchParams = new URLSearchParams({ 
        key: data.currentKey, 
        value: data.currentValue, 
        page: data.currentPage.toString() 
      })
      const ajax = common.ajax(groupPath.platform + `/Category/${data.categoryId}?${searchParams.toString()}`, 'get')
      data.isLoading = true

      common.getAjax(ajax).then((result: any) => {
        data.isLoading = false
        data.categories = result.categories
        data.category = result.category
        data.products = data.products.concat(result.products)
        data.totalPage = result.totalPage.length
        data.loadMore = data.totalPage > data.currentPage
      })
    }

    const resetProducts = () => {
      data.currentPage = 1
      data.products = []
      getCategory()
    }

    const getId = (id: number) => {
      data.categoryId = id
      $router.push({ name: 'Category', params: { id } })
    }
    
    const getSelquery = (query: queryType) => {
      data.currentKey = query.key
      data.currentValue = query.value
      resetProducts()
    }

    const handerScroll = (event: any) => {
      if (!data.isLoading && data.loadMore) {
        const { scrollHeight, offsetHeight, scrollTop } = event.srcElement
        if (scrollHeight - offsetHeight <= scrollTop + 5) {
          data.currentPage++
          getCategory()
        }
      }
    }

    state.commit('updateTitleName', '商品類別')
    onBeforeRouteUpdate((to) => {
      data.categoryId = +to.params.id
      resetProducts()
    })
    onMounted(() => getCategory())
    const resData = toRefs(data)
    return { ...resData, getId, handerScroll, getSelquery }
  }
})
</script>

<style lang="scss" scoped>
.category {
  margin-top: 50px;
}
</style>