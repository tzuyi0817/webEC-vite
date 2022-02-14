<template>
  <div class="product container" @scroll.passive="handleScroll" ref="productScroll">
    <product-banner :productImage="productImage" :isLoading="isLoading" />

    <template v-if="!isLoading">
      <product-content :product="product" :rating="rating" />
      <product-rating :product="product" :rating="rating" />

      <h1>相似商品</h1>
      <category-products-list :products="moreProducts" :isLoading="isLoading" :isShowPrompt="false" v-if="moreProducts.length > 0" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from 'vuex';
import { ajax, getAjax } from '../utils/common';
import ProductBanner from '../components/ProductBanner.vue';
import ProductContent from '../components/ProductContent.vue';
import ProductRating from '../components/ProductRating.vue';
import CategoryProductsList from '../components/CategoryProductsList.vue';
import { Types } from '@/types';

const store = useStore();
const { groupPath } = store.state;
const $bus = inject('$bus') as Types.Bus;
const isLoading = ref(false);
const product = ref({} as Types.Product);
const moreProducts = ref([]);
const rating = ref(0);
const productImage = ref([] as string[]);
const productScroll = ref();

const getProduct = async (id: string | null | string[] = null) => {
  id = id ?? useRoute().params.id;
  const ajaxGroup = ajax(groupPath.platform + `/product/${id}`, 'get');
  isLoading.value = true;

  const result = await getAjax(ajaxGroup);
  const { image, imageI, imageII } = result.product;
  isLoading.value = false;
  product.value = result.product;
  moreProducts.value = result.productsFilter;
  productImage.value = [image, imageI, imageII];
  rating.value = result.ratingAve;
  store.commit('updateTitleName', result.product.name);
};

const handleScroll = (event: Event) => $bus.$emit('scroll', (<HTMLDivElement>event.target).scrollTop);

onBeforeRouteUpdate((to) => {
  getProduct(to.params.id as string);
  productScroll.value.scrollTo(0, 0);
});
onMounted(() => getProduct());
</script>

<style lang="scss" scoped>
.product {
  h1 {
    margin: 10px;
    text-align: left;
  }
}
</style>