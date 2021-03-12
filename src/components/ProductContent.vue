<template>
  <div class="productContent">
    <p>{{ product.name }}</p>
    <p>{{ `$${product.price}` }}</p>
    <!-- <p>{{ star }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import * as common from '../utils/common'

export default defineComponent ({
  props: {
    product: Object
  },
  setup(props: any) {
    const star = ref(common.getStar(props.product.rating))

    return { star }
  }
})
</script>

<style lang="scss" scoped>
.productContent {
  p {
    padding: 10px;
    text-align: left;
    line-height: 20px;
    &:nth-child(2) {
      color: $baseColor;
      font-weight: bold;
    }
  }

  // .star {
  //   position: relative;
  //   margin: 0;
  //   padding: 0;
  //   display: flex;
  //   justify-content: center;
  // }

  // .stars {
  //   display: inline-block;
  //   width: 50%;
  //   height: 25px;
  //   vertical-align: middle;
  // }

  // i.fa-star-gray {
  //   color: #cbcbcb;
  // }

  // .percent-star {
  //   overflow: hidden;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  // }

  // i.fa-star-yellow {
  //   color: #fcb040;
  // }

  // .star > .fa {
  //   font-size: 25px;
  // }
}
</style>