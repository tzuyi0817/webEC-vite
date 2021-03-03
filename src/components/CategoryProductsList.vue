<template>
  <div class="categoryProductsList">
    <ul>
      <li v-for="item in products" :key="item.id">
        <a :href="`/product/${item.id}`">
          
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  props: {
    products: Array,
    isLoading: Boolean
  },
  setup() {

  }
})
</script>

<style lang="scss" scoped>
.categoryProductsList {
  margin: 30px 0;
}
</style>