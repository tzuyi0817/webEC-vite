import { createStore } from 'vuex'
import * as common from '../utils/common'
import * as actions from './action'

export default createStore({
  state: {
    groupPath: {},
    titleName: '',
    cartCount: 0,
    user: {}
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
    },
    updateUser(state, currentUser) {
      state.user = {
        ...state.user,
        ...currentUser
      }
    }
  },
  actions
})
