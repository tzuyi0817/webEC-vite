import { createStore } from 'vuex'

export default createStore({
  state: {
    groupPath: {},
    titleName: ''
  },
  mutations: {
    updateGroupPath(state, val) {
      state.groupPath = val
    },
    updateTitleName(state, val) {
      state.titleName = val
    }
  },
  actions: {
  }
})
