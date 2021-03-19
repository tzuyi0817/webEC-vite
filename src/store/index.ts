import { createStore } from 'vuex'
import * as common from '../utils/common'

export default createStore({
  state: {
    groupPath: {},
    titleName: '',
    cartCount: 0
  },
  mutations: {
    updateGroupPath(state, val) {
      state.groupPath = val
    },
    updateTitleName(state, val) {
      state.titleName = val
    },
    updateCartCount(state) {
      const cartItem = common.getCartItem()
      state.cartCount = cartItem ? cartItem.length : 0
    }
  },
  actions: {
  }
})
