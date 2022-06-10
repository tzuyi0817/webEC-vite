import { defineStore } from 'pinia';
import { LocalStorage, ajax, getAjax } from '@/utils/common';
import useGroupPathStore from '@/store/groupPath';
import type { Types } from '@/types';

export default defineStore('user', {
  state: () => ({
    user: <Types.User>{},
  }),
  actions: {
    updateUser(currentUser) {
      this.user = {
        ...this.user,
        ...currentUser
      };
    },
    emptyUser() {
      this.user = {};
      LocalStorage('remove', 'token');
    },
    async getUser() {
      const groupPathStore = useGroupPathStore();
      const ajaxGroup = ajax(groupPathStore.groupPath.platform + '/get_current_user', 'get');
      const result = await getAjax(ajaxGroup);
      this.updateUser(result);
    }
  }
});