<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flx-center">
        <img class="logo-img" src="@/assets/vue.svg" alt="logo" />
        <span class="logo-text">{{ title }}</span>
      </div>
      <el-menu mode="horizontal" router :default-active="activeMenu">
        <el-menu-item v-for="(e, i) in menuList" :index="e.path" :route="e.path">{{ e.meta?.title }}</el-menu-item>
      </el-menu>
      <el-dropdown>
        <el-avatar :size="40" src="https://picsum.photos/200/300" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawer = true">修改信息</el-dropdown-item>
            <el-dropdown-item @click="exit" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </el-main>
    <el-drawer v-model="drawer" direction="rtl" size="30%" :before-close="handleClose">
      ssds
    </el-drawer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/modules/user';
const route = useRoute();
const router = useRouter();
const { state } = storeToRefs(useUserStore());

// 获取layout下路由
const title = import.meta.env.VITE_GLOB_APP_TITLE;

import myrouter from '@/router/modules/dynamicRouter';
// 将首页放在第一个,不能修改原数组
const index = myrouter.findIndex((e) => e.path === '/home');
const menuList = ref([myrouter[index], ...myrouter.filter((e) => e.path !== '/home')]);
const activeMenu = computed(() => route.path);
// 用户信息
const drawer = ref(false);
const handleClose = () => {
  drawer.value = false;
};

const exit = () => {
  console.log('退出登录');
  state.value.token = '';
  // 重新加载页面
  router.replace('/login');
};
</script>

<style scoped lang='scss'>
.layout {
  height: 100vh;
  width: 100%;
  background-color: #fbfbfb;

  :deep(.el-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 15px 0 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 210px;
      margin-right: 30px;

      .logo-img {
        width: 28px;
        object-fit: contain;
        margin-right: 6px;
      }

      .logo-text {
        font-size: 21.5px;
        font-weight: bold;
        color: var(--el-header-logo-text-color);
        white-space: nowrap;
      }
    }

    .el-menu {
      flex: 1;
      height: 100%;
      overflow: hidden;
      border-bottom: none;

      .el-sub-menu__hide-arrow {
        width: 65px;
        height: 55px;
      }

      .el-menu-item.is-active {
        color: #3d3d3d;
      }

    }

    .el-dropdown {
      .el-avatar {
        &:focus-visible {
          outline: none;
        }
      }
    }
  }

  >:deep(.el-main) {
    padding: 10px;
    overflow: hidden;
  }

  .el-overlay {
    :deep(.el-drawer) {
      height: 100% !important;
    }
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }

  .fade-transform-enter-from {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(30px);
  }
}</style>
