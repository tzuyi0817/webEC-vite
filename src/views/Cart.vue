<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCartStore, useTitleStore } from '@/store';
import { useRouter } from 'vue-router';
import CartItem from '../components/CartItem.vue';
import { showToast, LocalStorage, getCartItem } from '../utils/common';
import { Types } from '@/types';

const cartStore = useCartStore();
const titleStore = useTitleStore();
const router = useRouter();
const cartItem = ref([]);
const subtotal = computed(() => {
  if (!cartItem.value) return 0;
  const total = cartItem.value.reduce((acc, curr: Types.CartItem) => acc + (curr.price * curr.quantity), 0);
  return `${total}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
});

const deleteProduct = (deleteIndex: number) => {
  cartItem.value = cartItem.value.filter((_, index: number) => index !== deleteIndex);
  saveCartItem();
  showToast('商品移除成功');
  cartStore.updateCartCount();
};
const saveCartItem = () => LocalStorage('set', 'cartItem', cartItem.value);
const goIndex = () => router.push({ name: 'Index' });

titleStore.updateTitleName('購物車');
onMounted(() => cartItem.value = getCartItem());
</script>

<template>
  <div class="cart container">
    <cart-item :cartItem="cartItem" @deleteProduct="deleteProduct" @saveCartItem="saveCartItem" />

    <div class="cart__empty" v-if="!cartItem || !cartItem.length">
      <img src="../assets/cart.png" />
      <p>購物車目前是空的</p>
      <button @click="goIndex">現在就去逛逛!</button>
    </div>

    <div class="cart__footer">
      小計: <span>${{ subtotal }}</span>
      <button>結帳</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  margin-top: 50px;
  &__empty {
    padding: 20px;
    img {
      width: 70%;
      max-width: 350px;
      max-height: 350px;
    }

    button {
      margin: 20px 0;
      padding: 8px 32px;
      color: $subColor;
      background: transparent;
      border: 1px solid $subColor;
      border-radius: 0;
      font-size: 0.875rem;
    }
  }

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