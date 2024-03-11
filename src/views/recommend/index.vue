<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="显示页面">
            <el-select v-model="filterForm.web" @change="webChange">
              <el-option
                v-for="(item, index) in webOprtions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广告类型">
            <el-select v-model="filterForm.type">
              <el-option
                v-for="(item, index) in typeOptions[filterForm.web]"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-select v-model="filterForm.productType">
              <el-option
                v-for="(item, index) in productTypeOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status">
              <el-option
                v-for="(item, index) in statusOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter-oper">
        <el-button type="primary" @click="openDialog">新增</el-button>
        <span>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </span>
      </div>
    </div>
    <el-table
      :data="tableData"
      :max-height="maxHeight"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="webName" label="显示页面" width="120" />
      <el-table-column prop="typeName" label="广告类型" width="120" />
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column prop="secondaryName" label="次级名称" width="120" />
      <el-table-column prop="productTypeName" label="产品类型" width="120" />
      <el-table-column prop="displayImage" label="显示图片" width="120">
        <template v-slot="scope">
          <ImagePreview
            v-if="scope.row.displayImage"
            :src="scope.row.displayImage"
            :previewSrcList="[scope.row.displayImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="第三级显示" width="150" />
      <el-table-column prop="weight" label="优先级" />
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-text :type="statusMap[scope.row.status]?.type">{{
            statusMap[scope.row.status]?.text
          }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.modifyTime" />
        </template>
      </el-table-column>
      <el-table-column prop="oper" label="操作" fixed="right" width="100">
        <template v-slot="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageParams.currentPage"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[50, 150, 300, 400]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <AddEditRec
      v-model="addOrEditDialog"
      :data="detailData"
      @refresh="update"
    />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { recommendList } from "@/api/recommend";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";
import { webOprtions, typeOptions, productTypeOptions } from "./constants";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const addOrEditDialog = ref(false);
const tableData = ref([]);
const detailData = ref();

const statusOptions = [
  { value: "", label: "全部" },
  { value: "000", label: "隐藏" },
  { value: "001", label: "显示" },
];
const statusMap = {
  "000": {
    type: "info",
    text: "隐藏",
  },
  "001": {
    type: "success",
    text: "显示",
  },
} as any;
// 过滤字段
const filterForm = reactive({
  web: "", // 显示页面
  type: "", // 广告类型
  productType: "", // 产品类型
  status: "", // 状态
});
// 分页信息
const total = ref(0);
const pageParams = reactive({
  currentPage: 1,
  pageSize: 50,
});

// 列表请求
const getData = async () => {
  loading.value = true;
  try {
    const res = await recommendList({
      ...pageParams,
      condition: {
        ...filterForm,
      },
    });
    loading.value = false;
    const { body } = res;
    total.value = body.totalCount;
    tableData.value = body.pageItems;
  } catch (error) {
    loading.value = false;
  }
};
// 初始化列表数据
getData();

// 搜索
const search = () => {
  pageParams.pageSize = 50;
  pageParams.currentPage = 1;
  getData();
};

// web改变
const webChange = () => {
  filterForm.type = "";
};

// 修改每页数量
const handleSizeChange = (value: number) => {
  pageParams.pageSize = value;
  getData();
};

// 改变当前页
const handleCurrentChange = (value: number) => {
  pageParams.currentPage = value;
  getData();
};

// 新增
const openDialog = () => {
  detailData.value = {};
  addOrEditDialog.value = true;
};

// 编辑
const handleEdit = (row: any) => {
  detailData.value = row;
  addOrEditDialog.value = true;
};
const update = () => {
  search();
};

// 重置
const reset = () => {
  filterForm.status = "";
  filterForm.web = "";
  filterForm.type = "";
  filterForm.productType = "";
};
</script>
<style lang="scss" scoped>
.filter {
  padding-bottom: 15px;
  .form-content {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .filter-oper {
    display: flex;
    justify-content: space-between;
  }
  :deep(.el-form) {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
      margin-left: 24px;
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
