import { defineStore } from 'pinia';
import { getCartItem } from '@/utils/common';

export default defineStore('cart', {
  state: () => ({
    cartCount: 0,
  }),
  actions: {
    updateCartCount() {
      const cartItem = getCartItem();
      this.cartCount = cartItem ?? cartItem.length ? cartItem.length : 0;
    },
  }
})