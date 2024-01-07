import { ref } from "vue";
import CryptoJS from "crypto-js";
import { defineStore } from "pinia";

export const useLoginStore = defineStore('_l', () => {
  const d = ref({
    _l: '',
    _p: '',
    _r: false,
  });
  // 加密
  const encrypt = (data: typeof d.value) => {
    d.value = {
      _l: data._l,
      _p: CryptoJS.AES.encrypt(data._p, data._l).toString(),
      _r: data._r,
    };
  };
  // 解密
  const decrypt = () => {
    const data = {
      _l: d.value._l,
      _p: CryptoJS.AES.decrypt(d.value._p, d.value._l).toString(CryptoJS.enc.Utf8),
      _r: d.value._r,
    };
    return data;
  };
  return {
    d,
    encrypt,
    decrypt,
  };
}, {
  persist: true,
});