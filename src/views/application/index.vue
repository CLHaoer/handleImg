<template>
  <el-container class="application">
    <div class="top">
      <div class="top-left">
        <el-image :src="image" fit="cover" :preview-src-list="[image]">
          <template #error>
            <div class="image-error">
              <span>暂无图片</span>
            </div>
          </template>
        </el-image>
      </div>
      <div class="top-mid">
        <el-button :icon="CirclePlus" circle></el-button>
      </div>
      <div class="top-right">
        <div class="table-title">结果</div>
        <el-table class="table" border :data="tableData">
          <el-table-column label="键" prop="key"></el-table-column>
          <el-table-column label="值" prop="value"></el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 5px;align-self: flex-end;">下载文件</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-form label-position="left" label-width="70">
        <el-form-item label="参数配置">
          <div class="common">
            <el-form-item label="通用配置">
              <el-switch v-model="formVal.common.commonConfig" />
            </el-form-item>
            <el-form-item label="单据类型">
              <el-select v-model="formVal.common.billType" placeholder="请选择">
                <el-option label="选项1" value="1" />
                <el-option label="选项2" value="2" />
              </el-select>
              <el-form-item label-width="auto" label="自动图像处理">
                <el-switch v-model="formVal.common.autoImg" />
              </el-form-item>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="formVal.common.language" placeholder="请选择">
                <el-option label="选项1" value="1" />
                <el-option label="选项2" value="2" />
              </el-select>
              <el-form-item label-width="auto" label="高精度OCR">
                <el-switch v-model="formVal.common.ocr" />
              </el-form-item>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="提取模式">
          <el-radio-group v-model="formVal.extractMode">
            <el-radio-button label="标准" />
            <el-radio-button label="极速" />
            <el-radio-button label="可视化" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="导出格式">
          <el-radio-group v-model="formVal.exportFormat">
            <el-radio-button label="PDF" />
            <el-radio-button label="WORD" />
            <el-radio-button label="EXCEL" />
          </el-radio-group>
        </el-form-item>
        <div class="file">
          <el-upload v-model:file-list="fileList" class="upload"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-preview="handlePreview"
            :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
            <el-button type="primary">浏览</el-button>
          </el-upload>
          <el-input readonly placeholder="文件路径" v-model="image"></el-input>
          <el-button type="primary">开始分析</el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { CirclePlus } from "@element-plus/icons-vue";

const image = ref('https://picsum.photos/400/400');

const tableData = ref([
  {
    key: '1',
    value: '1',
  },
  {
    key: '2',
    value: '2',
  },
  {
    key: '3',
    value: '3',
  },
]);

const formVal = reactive({
  common: {
    commonConfig: false,
    billType: '',
    autoImg: false,
    language: '',
    ocr: false,
  },
  extractMode: '',
  exportFormat: '',
});

// 上传
const fileList = ref([]);
const handlePreview = (file: any) => {
  console.log(file);
};
const handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList);
};
const beforeRemove = (file: any, fileList: any) => {
  return window.confirm(`确定移除 ${file.name}？`);
};
const handleExceed = (files: any, fileList: any) => {
  console.log(files, fileList);
  window.alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
};



</script>

<style scoped lang='scss'>
.application {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;

    .top-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      height: 300px;
      margin-right: 30px;
      border-radius: 8px;
      border: 1px solid #1a1a1a;
      overflow: hidden;

      .el-image {
        width: 100%;
        height: 100%;
        .image-error{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          color: #909399;
        }
      }
    }

    // .top-mid是一个向右的箭头
    .top-mid {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 210px;
      margin-right: 30px;

      .el-button {
        width: 40px;
        height: 40px;
        position: absolute;
        font-size: 40px;
      }

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 10px;
        background-color: #efefef;
      }

      &::after {
        content: '';
        display: block;
        width: 15px;
        height: 20px;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        background-color: #efefef;
      }
    }

    .top-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 300px;
      margin-right: 30px;

      .table-title {
        font-weight: bold;
        width: 100%;
        text-align: center;
        border: 1px solid #ebeef5;
        background-color: #fff;
      }

      .table {
        flex: 1;
      }
    }
  }

  .bottom {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;

    .el-form {
      width: 600px;

      .el-form-item {
        width: 100%;
      }
      .file{
        display: flex;
        width: 100%;
        justify-content: space-between;
        .el-input{
          --el-input-height: 32px;
          flex: 1;
          height: 32px;
          margin: 0 10px;
        }
      }

      .common {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;

        >.el-form-item {
          margin-bottom: 5px;
          display: flex;
          width: 100%;

          :deep(.el-form-item__content) {
            flex-wrap: nowrap;
          }

          .el-form-item {
            margin-left: 10px;
          }
        }
      }
      .upload{
        :deep(.el-upload) {
          width: 100%;
          .el-button{
            width: 100%;
          }
        }
      }
    }
  }
}</style>
