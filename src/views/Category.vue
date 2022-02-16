<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useGroupPathStore, useTitleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { getAjax, ajax } from '../utils/common';
import NavTabs from '../components/NavTabs.vue';
import CategoryProducts from '../components/CategoryProducts.vue';
import { Types } from '@/types';

const groupPathStore = useGroupPathStore();
const titleStore = useTitleStore();
const { groupPath } = storeToRefs(groupPathStore);
const router = useRouter();
const categories = ref([]);
const category = ref({});
const products = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPage = ref(0);
const currentKey = ref("");
const currentValue = ref("");
const categoryId =  ref(+useRoute().params.id);
const loadMore = ref(false);


const getCategory = async () => {
  const searchParams = new URLSearchParams({ 
    key: currentKey.value, 
    value: currentValue.value, 
    page: `${currentPage.value}`
  });
  const ajaxGroup = ajax(groupPath.value.platform + `/Category/${categoryId.value}?${searchParams.toString()}`, 'get');
  isLoading.value = true

  const result = await getAjax(ajaxGroup);
  isLoading.value = false;
  categories.value = result.categories;
  category.value = result.category;
  products.value = products.value.concat(result.products);
  totalPage.value = result.totalPage.length;
  loadMore.value = totalPage.value > currentPage.value;
};

const resetProducts = () => {
  currentPage.value = 1;
  products.value = [];
  getCategory();
};

const getId = (id: number) => {
  categoryId.value = id;
  router.push({ name: 'Category', params: { id } });
};

const getSelQuery = ({ key, value }: Types.RouteQuery) => {
  currentKey.value = key;
  currentValue.value = value;
  resetProducts()
};

const handleScroll = (event: Event) => {
  if (!isLoading.value && loadMore.value) {
    const { scrollHeight, offsetHeight, scrollTop } = <HTMLDivElement>event.target;
    if (scrollHeight - offsetHeight <= scrollTop + 5) {
      currentPage.value++;
      getCategory();
    }
  }
};

titleStore.updateTitleName('商品類別');
onBeforeRouteUpdate((to) => {
  categoryId.value = +to.params.id;
  resetProducts();
});
onMounted(getCategory);
</script>

<template>
  <div class="category container" @scroll.passive="handleScroll">
    <nav-tabs :options="categories" @getId="getId" :isLoading="false" :nowId="categoryId" />

    <category-products :category="category" :isLoading="isLoading" @getSelQuery="getSelQuery" :products="products" :loadMore="loadMore" />
  </div>
</template>

<style lang="scss" scoped>
.category {
  margin-top: 50px;
}
</style>