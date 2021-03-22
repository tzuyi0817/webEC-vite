<template>
  <div class="search container" @scroll.passive="handerScroll">
    <search-bar :isLoading="isLoading" @getKeyword="getKeyword" />

    <div class="search__sort">
      <strong>商品排序</strong>
      <sort-select :options="sortOptions" @getSelVal="getSelVal" />
    </div>

    <loading v-if="isLoading" />
    <div class="search__prompt" v-else>
      <p v-if="products.length > 0">{{ getKeywordPrompt }}搜尋到 {{ products.length }} 件商品</p>

      <template v-else>
        <icon name="exclamation-triangle" type="fas" />
        <p>找不到您所查詢「{{ currentKeyword }}」的相關商品</p>
      </template>
    </div>

    <category-products-list :products="products" :isLoading="isLoading" :loadMore="loadMore" v-if="products.length > 0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import SearchBar from '../components/SearchBar.vue'
import SortSelect from '../components/SortSelect.vue'
import CategoryProductsList from '../components/CategoryProductsList.vue'
import * as common from '../utils/common'
import { selValType } from '../utils/interface'


export default defineComponent ({
  components: {
    SearchBar,
    SortSelect,
    CategoryProductsList
  },
  setup() {
    const { groupPath } = useStore().state
    const sortOptions = common.getSortOptions()
    const data = reactive({
      products: [],
      currentPage: 1,
      totalPage: 0,
      currentKeyword: '',
      currentKey: '',
      currentValue: '',
      isLoading: false,
      loadMore: false
    })

    const getKeywordPrompt = computed(() => data.currentKeyword ? `「${data.currentKeyword}」` : '')

    const getSearch = async() => {
      const searchParams = new URLSearchParams({ 
        keyword: data.currentKeyword,
        key: data.currentKey, 
        value: data.currentValue, 
        page: data.currentPage.toString() 
      })

      const ajax = common.ajax(groupPath.platform + `/ESHOP/search?${searchParams.toString()}`, 'get')
      data.isLoading = true

      const result = await common.getAjax(ajax)
      data.isLoading = false
      data.products = data.products.concat(result.products)
      data.totalPage = result.totalPage.length
      data.loadMore = data.totalPage > data.currentPage
    }

    const resetProducts = () => {
      data.currentPage = 1
      data.products = []
      getSearch()
    }

    const getKeyword = (keyword: string) => {
      data.currentKeyword =  keyword
      resetProducts()
    }

    const getSelVal = (selVal: selValType) => {
      data.currentKey = selVal.query.key
      data.currentValue = selVal.query.value
      resetProducts()
    }

    const handerScroll = (event: any) => {
      if (!data.isLoading && data.loadMore) {
        const { scrollHeight, offsetHeight, scrollTop } = event.srcElement
        if (scrollHeight - offsetHeight <= scrollTop + 5) {
          data.currentPage++
          getSearch()
        }
      }
    }

    onMounted(() => getSearch())
    const resData = toRefs(data)
    return { ...resData, getKeyword, sortOptions, getSelVal, getKeywordPrompt, handerScroll }
  }
})
</script>

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