<template>
  <div class="cart container">
    <cart-item :cartItem="cartItem" @deleteProduct="deleteProduct" @saveCartItem="saveCartItem" />

    <div class="cart__footer">
      小計: <span>${{ subtotal }}</span>
      <button>結帳</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CartItem from '../components/CartItem.vue'
import * as common from '../utils/common'

export default defineComponent ({
  components: {
    CartItem
  },
  setup() {
    const store = useStore()
    const cartItem = ref([])
    const subtotal = computed(() => {
      const total = cartItem.value.reduce((acc, curr: any) => acc + (curr.price * curr.quantity), 0)
      return `${total}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    })

    const deleteProduct = (deleteIndex: number) => {
      cartItem.value = cartItem.value.filter((_: any, index: number) => index !== deleteIndex)
      saveCartItem()
    }
    const saveCartItem = async () => await common.LocalStorage('set', 'cartItem', cartItem.value)

    store.commit('updateTitleName', '購物車')
    onMounted(() => cartItem.value = common.getCartItem())
    return { cartItem, subtotal, deleteProduct, saveCartItem }
  }
})
</script>

<style lang="scss" scoped>
.cart {
  margin-top: 50px;
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 8px 12px;
    margin-bottom: 50px;
    span {
      margin: 0 12px 0 5px;
      font-weight: bold;
      color: $baseColor;
    }

    button {
      color: #fff;
      padding: 8px 10px;
      border: 2px solid #fff;
      background: $baseColor;
    }
  }
}
</style>