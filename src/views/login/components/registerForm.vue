<template>
  <div class="register-form">
    <div class="form-head">注 册</div>
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
      <el-form-item prop="registerName">
        <el-input :prefix-icon="User" size="large" v-model="registerForm.registerName" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input size="large" v-model="registerForm.phone" placeholder="请输入手机号">
          <template #prefix>
            <el-icon>
              <SvgIcon name="mobile-phone" color="#a8abb2" style="width: inherit; height: inherit;" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input size="large" v-model="registerForm.email" placeholder="请输入邮箱">
          <template #prefix>
            <el-icon>
              <SvgIcon name="email" color="#a8abb2" style="width: inherit; height: inherit;" />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" size="large" type="password" show-password v-model="registerForm.password"
          placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-form-item prop="passwordCheck">
        <el-input :prefix-icon="Lock" size="large" type="password" show-password v-model="registerForm.passwordCheck"
          placeholder="请再次输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <el-button :icon="UserFilled" size="large" type="primary" :loading="loading" @click="register">
        注 册
      </el-button>
      <el-button :icon="CircleClose" size="large" @click="resetForm">取 消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { UserFilled, User, Lock, CircleClose } from "@element-plus/icons-vue";
import { registerApi } from '@/api/modules/user';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from "../../../stores/modules/user";
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


const registerFormRef = ref<FormInstance>();
const registerRules: FormRules = {
  registerName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
  phone: [{
    required: true, trigger: 'blur', validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号格式错误'));
      } else {
        callback();
      }
    }
  }],
  email: [{
    required: true, trigger: 'blur', validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback();
      }
    }
  }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  passwordCheck: [{
    required: true, trigger: 'blur', validator: (rule, value, callback) => {
      if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    }
  }],
};

const loading = ref(false);
const registerForm = reactive({
  registerName: '',
  phone: '',
  email: '',
  password: '',
  passwordCheck: '',
});

const register = () => {
  if (!registerFormRef.value) return
  registerFormRef.value.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      console.log(state);
      // state.value.token = registerForm.password;
      const { data } = await registerApi(registerForm);
      console.log(data);
      
      router.push({ path: '/' });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });
};

const resetForm = () => {
  emit("update:modelValue", false);
  if (!registerFormRef.value) return
  registerFormRef.value.resetFields();
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      register();
    }
  };
});


</script>

<style scoped lang='scss'>
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
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

  .register-btn {
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
}</style>
