<template>
  <el-config-provider :locale="locale" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/languages";
import { ElConfigProvider } from "element-plus";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// init language
const i18n = useI18n();
onMounted(() => {
  const language = getBrowserLang();
  i18n.locale.value = language;
});

// element language
const locale = computed(() => {
  return getBrowserLang() == "zh" ? zhCn : en;
});

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
