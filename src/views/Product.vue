<template>
  <div class="product container" @scroll.passive="handerScroll">
    <product-banner :productImage="productImage" :isLoading="isLoading" />
    <product-content v-if="!isLoading" :product="product" :rating="rating" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, onUnmounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import * as common from '../utils/common'
import ProductBanner from '../components/ProductBanner.vue'
import ProductContent from '../components/ProductContent.vue'

export default defineComponent ({
  components: {
    ProductBanner,
    ProductContent
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
      totalPage: 0
    })

    const getProduct = () => {
      const { id } = useRoute().params
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
        state.commit('updateProductName', result.product.name)
      })
    }
    const handerScroll = (event: any) => $bus.$emit('scroll', event.srcElement.scrollTop)

    onMounted(() => getProduct())
    onUnmounted(() => state.commit('updateProductName', ''))
    const resDate = toRefs(data)
    return { ...resDate, handerScroll }
  }
})
</script>

<style lang="scss" scoped>

</style>