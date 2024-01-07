import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
// svg icons
import "virtual:svg-icons-register";
// 使用router
import router from '@/router'
// 使用element-plus
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
// 使用pinia
import pinia from '@/stores'
// 使用i18n
import i18n from '@/languages/index'


const app = createApp(App)
app.use(pinia).use(router).use(ElementPlus).use(i18n).mount('#app')
