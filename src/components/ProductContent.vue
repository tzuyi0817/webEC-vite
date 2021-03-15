<template>
  <div class="productContent">
    <p>{{ product.name }}</p>
    <p>{{ `$${product.price}` }}</p>

    <div class="productContent__stars">
      <template v-if="product.Comments && product.Comments.length">
        <stars :rating="rating" />
        <span class="rating">{{ rating }}</span>
      </template>
      <span v-else>此商品尚未有人評價</span>
      
      <iframe
        :src="facebook"
        width="75"
        height="35"
        style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
    
    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Stars from '../components/Stars.vue'
import * as common from '../utils/common'

export default defineComponent ({
  props: {
    product: Object,
    rating: Number
  },
  components: {
    Stars
  },
  setup(props: any) {
    const facebook = computed(() => {
      return `https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ftzuyi0817.github.io%2Fac_s4_final_project_ecweb_vue%2F%23%2Fproduct%2F${props.product.id}&layout=button&size=large&width=69&height=28&appId`
    })

    return { facebook }
  }
})
</script>

<style lang="scss" scoped>
.productContent {
  padding: 10px;
  &__stars {
    margin: 20px 0;
    display: flex;
    align-items: center;
    .rating {
      color: $baseColor;
    }

    span {
      margin-right: 8px;
    }
  }

  p {
    font-size: 17px;
    margin: 10px 0;
    text-align: left;
    line-height: 20px;
    &:nth-child(2) {
      color: $baseColor;
      font-weight: bold;
    }
  }
}
</style>