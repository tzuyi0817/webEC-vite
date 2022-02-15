import { defineStore } from 'pinia';

export default defineStore('groupPath', {
  state: () => ({
    groupPath: {
      platform: '',
    },
  }),
  actions: {
    updateGroupPath(val) {
      this.groupPath = val;
    },
  }
});

