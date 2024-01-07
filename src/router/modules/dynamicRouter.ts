import { RouteRecordRaw } from "vue-router";

// typings.d.ts 或 router.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends Menu.MetaProps { }
}

const pages = import.meta.glob<Menu.MetaProps>('@/views/**/page.ts',{
  eager: true,
  import: 'default'
})

const comps = import.meta.glob('@/views/**/index.vue')

let routes = Object.entries(pages).map(([path, meta]): RouteRecordRaw => {
  const comPath = path.replace('/page.ts','/index.vue')
  path = path.replace('/src/views','').replace('/page.ts','')
  const name = path.split('/').filter(Boolean).join('-')
  const component = comps[comPath]
  return {
    path,
    name,
    component,
    meta:{
      ...meta
    },
  }
})
// 移除login
routes =  routes.filter(item => item.path !== '/login')

export default routes