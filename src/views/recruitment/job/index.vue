<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="公司名">
            <CompanySelect
              v-model:companyId="filterForm.companyId"
              v-model:companyName="filterForm.companyName"
            />
          </el-form-item>
          <el-form-item label="公司类型">
            <el-input
              v-model="filterForm.companyType"
              clearable
              placeholder="公司类型"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input
              v-model="filterForm.name"
              clearable
              placeholder="职位名称"
            ></el-input>
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
        <div class="search">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
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
      <el-table-column prop="weight" label="优先级" width="90" />
      <el-table-column prop="companyName" label="公司名" width="160" />
      <el-table-column prop="companyType" label="公司类型" width="160" />
      <el-table-column prop="city" label="所在城市" width="120" />
      <el-table-column prop="keywords" label="关键字" width="120" />
      <el-table-column prop="name" label="岗位名称" width="150" />
      <el-table-column prop="salary" label="薪资" width="120" />
      <el-table-column prop="address" label="地址" width="200" />
      <el-table-column prop="workingAge" label="工龄" width="120" />
      <el-table-column prop="education" label="学历" width="120" />
      <el-table-column prop="url" label="跳转链接" width="200" />
      <el-table-column prop="status" label="状态" width="120">
        <template v-slot="scope">
          <el-text :type="statusMap[scope.row.status].type">{{
            statusMap[scope.row.status].text
          }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.modifyTime" />
        </template>
      </el-table-column>
      <el-table-column prop="oper" label="操作" fixed="right" width="180">
        <template v-slot="scope">
          <el-button
            size="small"
            type="warning"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleDetail(scope.row)"
            >职位详情</el-button
          >
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
    <JobAddEdit v-model="addOrEditDialog" :id="editId" @refresh="update" />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { jobList } from "@/api/recruitment";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const jobDialog = ref(false);
const JobDetailContent = ref("");
const addOrEditDialog = ref(false);
const editId = ref("");
const tableData = ref([]);
const statusOptions = [
  { value: "", label: "全部" },
  { value: "000", label: "不展示" },
  { value: "001", label: "展示" },
];
const statusMap = {
  "000": {
    type: "danger",
    text: "不展示",
  },
  "001": {
    type: "success",
    text: "展示",
  },
} as any;

// 过滤字段
const filterForm = reactive({
  companyId: "", // 公司ID
  companyName: "", // 公司名称
  companyType: "", // 公司类型
  name: "", // 职位名称
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
    const res = await jobList({
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

// 新增
const openDialog = () => {
  editId.value = "";
  addOrEditDialog.value = true;
};
// 编辑
const handleEdit = (id: string) => {
  addOrEditDialog.value = true;
  editId.value = id;
};

// 查看职位详情
const handleDetail = async (row: any) => {
  JobDetailContent.value = row.workDetails;
  jobDialog.value = true;
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
  filterForm.companyId = "";
  filterForm.companyName = "";
  filterForm.companyType = "";
  filterForm.name = "";
  filterForm.status = "";
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
  :deep(.el-form) {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
      margin-right: 24px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
.filter-oper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.pagination {
  margin-top: 20px;
}
</style>
