import { createStore } from 'vuex'

export default createStore({
  state: {
    groupPath: {},
    productName: ''
  },
  mutations: {
    updateGroupPath(state, val) {
      state.groupPath = val
    },
    updateProductName(state, val) {
      state.productName = val
    }
  },
  actions: {
  }
})
