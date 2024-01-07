<template>
  <el-container class="histry-page">
    <el-main>
      <el-table border  :data="tableData">
        <el-table-column prop="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <el-image
              style="width: 100px; height: 100px;"
              preview-teleported
              :src="row.image"
              :preview-src-list="[row.image]"
              :initial-index="0"
              fit="cover"
              >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="{ row }">
            {{ moment(row.time).format('YYYY年MM月DD日 HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作">
          <el-button link type="primary">下载文件</el-button>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'

const tableData = reactive([
  {
    index: 1,
    name: '测试文件1',
    image: 'https://picsum.photos/id/1/400/300',
    // time为时间戳
    time: new Date().getTime(),
    status: '已完成'
  },
  {
    index: 2,
    name: '测试文件2',
    image: 'https://picsum.photos/id/2/400/300',
    time: new Date().getTime(),
    status: '已完成'
  },
  {
    index: 3,
    name: '测试文件3',
    image: 'https://picsum.photos/id/3/400/300',
    time: new Date().getTime(),
    status: '已完成'
  },

])

</script>

<style scoped lang='scss'>
.histry-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .el-main {
    width: 100%;
    .el-table {
      height: 100%;
    }
  }
  .el-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
