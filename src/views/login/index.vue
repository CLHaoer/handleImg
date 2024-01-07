<template>
  <div class="login-container">
    <loginForm v-model="isRegister" v-if="!isRegister"></loginForm>
    <registerForm v-model="isRegister" v-else></registerForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import loginForm from './components/loginForm.vue';
import registerForm from './components/registerForm.vue';
const isRegister = ref(false);

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/bgc.jfif') no-repeat center center/cover;
}
</style>
