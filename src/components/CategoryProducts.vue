<template>
  <div class="categoryProducts">
    <loading v-if="isLoading && !products.length" />
    <img v-else :src="category.image" class="fade" />

    <strong>商品排序</strong>
    <sort-select :options="sortOptions" @getSelVal="getSelVal" />
    <p>{{ category.name }}</p>

    <category-products-list :products="products" :isLoading="isLoading" :loadMore="loadMore" />
  </div>
</template>

<script setup lang="ts">
import SortSelect from '../components/SortSelect.vue';
import CategoryProductsList from '../components/CategoryProductsList.vue';
import { selValType, productType, categoryType } from '../utils/interface';
import { sortOptions } from '../utils/common';

interface Props {
  category: categoryType,
  isLoading: Boolean,
  products: productType[],
  loadMore: Boolean
};

defineProps<Props>();
const emit = defineEmits(["getSelQuery"]);

const getSelVal = (selVal: selValType) => emit('getSelQuery', selVal.query);
</script>

<style lang="scss" scoped>
.categoryProducts {
  margin: 20px 0;
  img {
    margin-bottom: 20px;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  strong, p {
    color: $baseColor;
  }

  p {
    margin: 30px;
    font-weight: bold;
    font-size: 22px;
  }
}
</style>