<template>
  <div class="login-form">
    <div class="form-head">登 录</div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <el-form-item prop="loginName">
        <el-input :prefix-icon="User" size="large" v-model="loginForm.loginName" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" size="large" type="password" show-password v-model="loginForm.password"
          placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item class="form-footer" prop="remember">
        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
        <div class="register" @click="emit('update:modelValue', true)">立即注册</div>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button :icon="UserFilled" size="large" type="primary" :loading="loading" @click="login">
        登录
      </el-button>
      <el-button :icon="CircleClose" size="large" @click="resetForm"> 重置 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { UserFilled, User, Lock, CircleClose } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from "@/stores/modules/user";
import { useLoginStore } from "@/stores/modules/login";
import { storeToRefs } from 'pinia';

const porps = withDefaults(defineProps<{
  modelValue: boolean,
}>(), {
  modelValue: false,
})
const emit = defineEmits<{
  "update:modelValue": [val: boolean]
}>();

const router = useRouter();
const { state } = storeToRefs(useUserStore());
const { encrypt, decrypt } = useLoginStore();


const loginFormRef = ref<FormInstance>();
const loginRules: FormRules = {
  loginName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  remember: [{ required: false, message: '请勾选记住密码', trigger: 'blur' }],
};

const loading = ref(false);
const data = decrypt();
const loginForm = reactive({
  loginName: data._l || '',
  password: data._p || '',
  remember: data._p && data._r || false,
});

const login = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          state.value.token = loginForm.password;
          resolve();
        }, 2000)
      })
      if (loginForm.remember) {
        encrypt({
          _l: new Date().getTime().toString(),
          _p: loginForm.password,
          _r: loginForm.remember,
        });
      }else{
        encrypt({
          _l: '',
          _p: '',
          _r: false,
        });
      }
      router.push({ path: '/' });

    } finally {
      loading.value = false;
    }
  });
};

const resetForm = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.resetFields();
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login();
    }
  };
});


</script>

<style scoped lang='scss'>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .form-head {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
  }

  .el-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .form-footer {
    :deep(.el-form-item__content) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .register {
        color: #409eff;
        cursor: pointer;
      }
    }
  }

  .login-btn {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 20px;

    .el-button {
      width: 100%;

      &:first-child {
        margin-bottom: 10px;
      }

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
