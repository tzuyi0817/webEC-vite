<template>
  <div class="product container" @scroll.passive="handerScroll" ref="productScroll">
    <product-banner :productImage="productImage" :isLoading="isLoading" />

    <template v-if="!isLoading">
      <product-content :product="product" :rating="rating" />
      <product-rating :product="product" :rating="rating" />

      <h1>相似商品</h1>
      <category-products-list :products="moreProducts" :isLoading="isLoading" :isShowPrompt="false" v-if="moreProducts.length > 0" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, inject } from 'vue'
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
    const store = useStore()
    const { groupPath } = store.state
    const $bus: any = inject('$bus')
    const data = reactive({
      isLoading: false,
      product: {},
      moreProducts: [],
      rating: 0,
      productImage: [''],
      productScroll: null as any
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
        store.commit('updateTitleName', result.product.name)
      })
    }
    const handerScroll = (event: any) => $bus.$emit('scroll', event.srcElement.scrollTop)

    onBeforeRouteUpdate((to) => {
      getProduct(to.params as any)
      data.productScroll.scrollTo(0, 0)
    })
    onMounted(() => getProduct())
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