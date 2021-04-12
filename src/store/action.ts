import * as common from '../utils/common'

export const getUser = async ({ state, commit }) => {
  const ajax = common.ajax(state.groupPath.platform + '/get_current_user', 'get')
  const result = await common.getAjax(ajax)
  commit('updateUser', result)
}
