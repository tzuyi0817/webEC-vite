<template>
  <div class="product container" @scroll.passive="handerScroll" ref="productScroll">
    <product-banner :productImage="productImage" :isLoading="isLoading" />
    <product-content v-if="!isLoading" :product="product" :rating="rating" />
    <product-rating v-if="!isLoading" :product="product" :rating="rating" />

    <h1>相似商品</h1>
    <category-products-list :products="moreProducts" :isLoading="isLoading" :isShowPrompt="false" v-if="moreProducts.length > 0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, onUnmounted, inject } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import * as common from '../utils/common'
import { paramsType } from '../utils/interface'
import ProductBanner from '../components/ProductBanner.vue'
import ProductContent from '../components/ProductContent.vue'
import ProductRating from '../components/ProductRating.vue'
import CategoryProductsList from '../components/CategoryProductsList.vue'

export default defineComponent ({
  components: {
    ProductBanner,
    ProductContent,
    ProductRating,
    CategoryProductsList
  },
  setup() {
    const { groupPath } = useStore().state
    const state = useStore()
    const $bus: any = inject('$bus')
    const data = reactive({
      isLoading: false,
      product: {},
      moreProducts: [],
      rating: 0,
      comment: [],
      productImage: [''],
      totalPage: 0,
      productScroll: null
    })

    const getProduct = (params: paramsType = { id: '' }) => {
      const { id } = params.id ? params : useRoute().params
      const ajax = common.ajax(groupPath.platform + `/product/${id}`, 'get')
      data.isLoading = true

      common.getAjax(ajax).then((result: any) => {
        const { image, imageI, imageII } = result.product
        data.isLoading = false
        data.product = result.product
        data.moreProducts = result.productsFilter
        data.productImage = [image, imageI, imageII]
        data.rating = result.ratingAve
        data.comment = result.comment
        data.totalPage = result.totalPage.length
        state.commit('updateTitleName', result.product.name)
      })
    }
    const handerScroll = (event: any) => $bus.$emit('scroll', event.srcElement.scrollTop)

    onBeforeRouteUpdate((to) => {
      getProduct(to.params as any)
      data.productScroll.scrollTo(0, 0)
    })
    onMounted(() => getProduct())
    onUnmounted(() => {
      state.commit('updateTitleName', '')
      $bus.$emit('scroll', 0)
    })
    const resDate = toRefs(data)
    return { ...resDate, handerScroll }
  }
})
</script>

<style lang="scss" scoped>
.product {
  h1 {
    margin: 10px;
    text-align: left;
  }
}
</style>