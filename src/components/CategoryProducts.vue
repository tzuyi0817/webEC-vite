<template>
  <div class="categoryProducts">
    <strong>{{ category.name }}</strong>
    <sort-select :options="sortOptions" @getSelVal="getSelVal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SortSelect from '/@/components/SortSelect.vue'

export default defineComponent ({
  props: {
    category: Object,
    isLoading: Boolean
  },
  components: {
    SortSelect
  },
  setup() {
    const sortOptions = [
      { name: '上架時間: 新到舊', query: { key: 'createdAt', value: 'desc' }, value: 'timeDesc' },
      { name: '上架時間: 舊到新', query: { key: 'createdAt', value: 'asc' }, value: 'timeAsc' },
      { name: '價格: 高至低', query: { key: 'price', value: 'desc' }, value: 'priceDesc' },
      { name: '價格: 低至高', query: { key: 'price', value: 'asc' }, value: 'priceAsc' }
    ]
    const getSelVal = (selVal: {}) => {
      console.log(selVal)
    }

    return { sortOptions, getSelVal }
  }
})
</script>

<style lang="scss"scoped>
.categoryProducts {
  margin: 20px 0;
  strong {
    color: $baseColor;
  }
}
</style>