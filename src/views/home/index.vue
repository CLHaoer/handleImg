<template>
  <el-container class="home-page">
    <div class="left">
      <div class="image">
        <el-image src="https://picsum.photos/400/400" fit="cover" />
      </div>
    </div>
    <div class="right">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
      <el-button @click="toApp">立即开始</el-button>
    </div>

  </el-container>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = '通用表单图像结构化识别系统'
const subtitle = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const toApp = () => {
  router.push('/application')
}

</script>

<style scoped lang='scss'>
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    // 正方形图片
    .image {
      width: 400px;
      height: 400px;
      background-color: skyblue;
      overflow: hidden;
      .el-image {
        width: 100%;
        height: 100%;
      }
      
    }
  }
  .right {
    margin-left: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .subtitle {
      font-size: 20px;
      margin-bottom: 20px;
    }

  }
}
</style>
