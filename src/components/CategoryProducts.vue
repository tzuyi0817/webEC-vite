<template>
  <div class="categoryProducts">
    <strong>{{ category.name }}</strong>
    <sort-select />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import SortSelect from '/@/components/SortSelect.vue'

export default defineComponent ({
  props: {
    category: Object,
    isLoading: Boolean
  },
  components: {
    SortSelect
  }
})
</script>

<style lang="scss"scoped>
.categoryProducts {
  margin: 20px 0;
  
}
</style>