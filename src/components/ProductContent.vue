<template>
  <div class="productContent">
    <h1>{{ product.name }}</h1>
    <h1 class="price">{{ `$${product.price}` }}</h1>

    <div class="productContent__stars">
      <template v-if="product.Comments && product.Comments.length">
        <stars :rating="rating"  @click="goRating" />
        <span class="rating">{{ rating }}</span>
      </template>
      <span v-else @click="goRating">此商品尚未有人評價</span>
      
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
    
    <div class="productContent__transport">
      <p><icon name="clock" type="fas" />較長備貨 (出貨天數 15 天)</p>
      <p><img src="https://cdngarenanow-a.akamaihd.net/shopee/shopee-pcmall-live-sg/assets/9d21899f3344277e34d40bfc08f60bc7.png" width="22" height="14" />免運費</p>
      <span>滿$999，免運費</span>
      <p><icon name="truck" type="fas" />運費: $60</p>
    </div>

    <div class="productContent__quantity">
      <input type="number" min="1" v-model.number="quantity" :disabled="disable" @input="handlerInput($event)" />
      <div class="nav">
        <button class="up" @click="quantityBtn('+')" :disabled="disable"><icon name="plus" type="fas" /></button>
        <button class="down" @click="quantityBtn('-')" :disabled="quantity <= 1"><icon name="minus" type="fas" /></button>
      </div>

      <button :class="['btnStyle', { 'btnStyle--disable': !product.count || isLoading }]" @click="addCart" :disabled="!product.count || isLoading">
        {{ !product.count ? '商品補貨中' : isLoading ? '處理中...' : '加入購物車' }}
      </button>
    </div>

    <div class="productContent__detail">
      <h1>商品詳情</h1>
      <hr />

      <div>
        <p>商品數量</p>
        <span>{{ product.count }}</span>
      </div>
      <div>
        <p>類別</p>
        <button @click="goCategory">
          {{ product.Product_category && product.Product_category.name }} 
          <icon name="chevron-right" type="fas" />
        </button>
      </div>
      <hr />

      <p class="description">{{ product.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import Stars from '../components/Stars.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
    const store = useStore()
    const { groupPath } = store.state
    const $router = useRouter()
    const { product } = props
    const quantity = ref(1)
    const isLoading = ref(false)

    const disable = computed(() => quantity.value >= product.count)
    const facebook = computed(() => {
      return `https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ftzuyi0817.github.io%2Fac_s4_final_project_ecweb_vue%2F%23%2Fproduct%2F${product.id}&layout=button&size=large&width=69&height=28&appId`
    })

    const handlerInput = (event: InputEvent) => {
      const { value }: any = event.target
      if (value > product.count) quantity.value = product.count
      if (value < 1) quantity.value = 1
    }
    const quantityBtn = (type: string) => type == '+' ? quantity.value++ : quantity.value--
    const goCategory = () => $router.push({ name: 'Category', params: { id: product.ProductCategoryId } })
    const goRating = () => $router.push({ name: 'Rating', params: { id: product.id } })
    const addCart = async() => {
      const ajax = common.ajax(groupPath.platform + '/cart', 'post')
      const data = { 
        productId: product.id, 
        quantity: quantity.value
      }
      isLoading.value = true

      const result = await common.getAjax(ajax, data)
      isLoading.value = false
      if (result.status == 'success') {
        common.LocalStorage('set', 'cartItem', { ...product, quantity: quantity.value })
        store.commit('updateCartCount')
        common.showToast('商品已加入購物車')
        quantity.value = 1
      } else {
        common.showToast('商品無法加入購物車，請稍後再試')
      }
    }

    return { facebook, quantity, disable, handlerInput, quantityBtn, addCart, isLoading, goCategory, goRating }
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

  &__transport {
    font-size: 14px;
    p {
      padding: 5px 2px;
      display: flex;
      align-items: center;
      &:first-child {
        color: $baseColor;
        background: rgba($subColor, 0.1);
        font-weight: bold;
      }

      svg {
        width: 20px;
        margin-right: 5px;
      }

      img {
        margin-right: 3px;
      }
    }

    span {
      margin-top: -15px;
      padding-left: 27px;
      opacity: 0.6;
      display: block;
      text-align: left;
    }
  }

  &__quantity {
    display: flex;
    margin: 20px 0;
    height: 45px;

    input {
      color: $baseColor;
      text-align: center;
      width: 150px;
      height: 45px;
      float: left;
      display: block;
      margin: 0;
      padding: 5px 20px;
      border: 1px solid #eee;
    }

    .nav {
      float: left;
      position: relative;
      height: 45px;
      button {
        background: #fff;
        position: relative;
        border: 1px solid #eee;
        width: 20px;
        height: 50%;
        text-align: center;
        color: #333;
        transform: translateX(-100%);
        user-select: none;
        border-radius: 0px;
        svg {
          width: 8px
        }

        &:disabled {
          background: rgba(0, 0, 0, 0.1);
          color: #fff;
        }
      }

      .up {
        top: 1;
        border-bottom: none;
      }

      .down {
        position: absolute;
        left: 0;
        bottom: 0px;
      }
    }

    .btnStyle {
      margin: 0;
      &--disable {
        color: red;
        &:hover, &:active {
          box-shadow: 0 0 5px red, 0 0 25px red;
          color: #fff;
          &::after,
          &::before {
            background: red;
          }
        }

        &::before {
          display: none;
        }
      }
    }
  }

  &__detail {
    margin: 30px 0;
    h1 {
      padding: 5px;
    }

    button {
      background: transparent;
    }

    div {
      display: flex;
      font-size: 14px;
      align-items: center;
      p {
        width: 110px;
      }

      button, span {
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        padding: 10px;
        flex: 1;
        color: $baseFont;
        svg {
          width: 8px;
        }
      }
    }

    .description {
      font-size: 14px;
      opacity: 0.6;
    }
  }

  .price {
    color: $baseColor;
    font-weight: bold;
  }

  p, h1 {
    margin: 10px 0;
    text-align: left;
    line-height: 20px;
  }
}
</style>