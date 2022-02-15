import { defineStore } from 'pinia';

export default defineStore('title', {
  state: () => ({
    titleName: '',
  }),
  actions: {
    updateTitleName(val) {
      this.titleName = val;
    },
  }
});
