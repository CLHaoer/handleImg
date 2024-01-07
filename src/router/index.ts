import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import NProgress from "./modules/nprogress";


const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1.NProgress 开始
  NProgress.start();

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === '/login') {
    if (userStore.state.token) return next(from.fullPath);
    else return next();
  }

  // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  // if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5.判断是否有 Token，没有重定向到 login 页面
  if (!userStore.state.token) return next({ path: '/login', replace: true });

  // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  // if (!authStore.authMenuListGet.length) {
  //   await initDynamicRouter();
  //   return next({ ...to, replace: true });
  // }

  // 7.存储 routerName 做按钮权限筛选
  // authStore.setRouteName(to.name as string);

  // 8.正常访问页面
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});


export default router;
