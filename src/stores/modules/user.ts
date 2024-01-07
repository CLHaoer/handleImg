import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const state = ref({
    token: "",
    userInfo: {}
  });

  return {
    state
  };
}, {
  persist: true,
});
