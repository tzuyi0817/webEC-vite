import { createStore } from 'vuex'

export default createStore({
  state: {
    groupPath: {}
  },
  mutations: {
    updateGroupPath(state, val) {
      state.groupPath = val
    }
  },
  actions: {
  }
})
