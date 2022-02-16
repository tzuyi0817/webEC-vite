<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useGroupPathStore } from '@/store';
import { storeToRefs } from 'pinia'
import SearchBar from '@/components/SearchBar.vue';
import SortSelect from '@/components/SortSelect.vue';
import CategoryProductsList from '@/components/CategoryProductsList.vue';
import { SortOptions, ajax, getAjax } from '@/utils/common';
import { Types } from '@/types';

const groupPathStore = useGroupPathStore();
const { groupPath } = storeToRefs(groupPathStore);
const products = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const currentKeyword = ref("");
const currentKey = ref("");
const currentValue = ref("");
const isLoading = ref(false);
const loadMore = ref(false);
const getKeywordPrompt = computed(() => currentKeyword.value ? `「${currentKeyword.value}」` : "");

const getSearch = async () => {
  const searchParams = new URLSearchParams({ 
    keyword: currentKeyword.value,
    key: currentKey.value, 
    value: currentValue.value, 
    page: currentPage.value.toString() 
  });

  const ajaxGroup = ajax(groupPath.value.platform + `/ESHOP/search?${searchParams.toString()}`, 'get');
  isLoading.value = true;

  const result = await getAjax(ajaxGroup);
  isLoading.value = false;
  products.value = products.value.concat(result.products);
  totalPage.value = result.totalPage.length;
  loadMore.value = totalPage.value > currentPage.value;
}

const resetProducts = () => {
  currentPage.value = 1;
  products.value = [];
  getSearch();
}

const getKeyword = (keyword: string) => {
  currentKeyword.value =  keyword;
  resetProducts();
}

const getSelVal = (selVal: Types.SelectValue) => {
  currentKey.value = selVal.query.key;
  currentValue.value = selVal.query.value;
  resetProducts();
}

const handleScroll = (event: Event) => {
  if (!isLoading.value && loadMore.value) {
    const { scrollHeight, offsetHeight, scrollTop } = <HTMLDivElement>event.target;
    if (scrollHeight - offsetHeight <= scrollTop + 5) {
      currentPage.value++;
      getSearch();
    }
  }
};

onMounted(getSearch);
</script>

<template>
  <div class="search container" @scroll.passive="handleScroll">
    <search-bar :isLoading="isLoading" @getKeyword="getKeyword" />

    <div class="search__sort">
      <strong>商品排序</strong>
      <sort-select :options="SortOptions" @getSelVal="getSelVal" />
    </div>

    <loading v-if="isLoading && !products.length" />
    <div class="search__prompt" v-else>
      <p v-if="products.length > 0">{{ getKeywordPrompt }}搜尋到 {{ products.length }} 件商品</p>

      <template v-else>
        <icon name="exclamation-triangle" type="fas" />
        <p>找不到您所查詢「{{ currentKeyword }}」的相關商品</p>
      </template>
    </div>

    <category-products-list v-if="products.length > 0" :products="products" :isLoading="isLoading" :loadMore="loadMore" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  margin-top: 70px;
  &__sort {
    margin: 20px 0;
  }

  &__prompt {
    margin: 30px 0;
    p {
      font-weight: bold;
      font-size: 20px;
      color: $baseColor;
    }

    svg {
      margin: 20px 0;
      color: #d9d9d9;
      width: 100px;
    }
  }

  strong {
    color: $baseColor;
  }
}
</style>