<template>
  <div class="app-container">
    <div class="filter">
      <el-form :model="filterForm">
        <el-form-item label="公司名">
          <CompanySelect v-model:companyName="filterForm.companyName" />
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input
            v-model="filterForm.positionName"
            placeholder="职位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            v-model="filterForm.username"
            placeholder="用户昵称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="filter-oper">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :max-height="maxHeight"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="companyId" label="公司ID" width="80" />
      <el-table-column prop="companyName" label="公司名" />
      <el-table-column prop="positionName" label="职位名称" />
      <el-table-column prop="username" label="用户昵称" />
      <el-table-column prop="createTime" label="创建时间">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间">
        <template v-slot="scope">
          <FromatDate :time="scope.row.modifyTime" />
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
    <JobDetail v-model="jobDialog" :detailContent="JobDetailContent" />
    <AddOrEdit v-model="addOrEditDialog" :id="editId" @refresh="update" />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { clickList } from "@/api/recruitment";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const jobDialog = ref(false);
const JobDetailContent = ref("");
const addOrEditDialog = ref(false);
const editId = ref("");
const tableData = ref([]);
// 过滤字段
const filterForm = reactive({
  companyName: "", // 公司名称
  positionName: "", //职位名称
  username: "", // 用户名
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
    const res = await clickList({
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

// 更新数据
const update = () => {
  search();
};

// 重置
const reset = () => {
  filterForm.companyName = "";
  filterForm.positionName = "";
  filterForm.username = "";
  filterForm.status = "";
};
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
  :deep(.el-form) {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
      margin-right: 24px;
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
