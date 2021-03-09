<template>
  <div class="categoryProducts">
    <loading v-if="isLoading" />
    <img v-else :src="category.image" class="fade" />

    <strong>商品排序</strong>
    <sort-select :options="sortOptions" @getSelVal="getSelVal" />
    <p>{{ category.name }}</p>

    <category-products-list :products="products" :isLoading="isLoading" :loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SortSelect from '../components/SortSelect.vue'
import CategoryProductsList from '../components/CategoryProductsList.vue'
import { selValType } from '../utils/interface'
import * as common from '../utils/common'

export default defineComponent ({
  props: {
    category: Object,
    isLoading: Boolean,
    products: Array,
    loadMore: Boolean
  },
  emits: ['getSelquery'],
  components: {
    SortSelect,
    CategoryProductsList
  },
  setup(props, { emit }) {
    const sortOptions = common.getSortOptions()
    const getSelVal = (selVal: selValType) => emit('getSelquery', selVal.query)

    return { sortOptions, getSelVal }
  }
})
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