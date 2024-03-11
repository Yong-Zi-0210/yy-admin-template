<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="公司名称">
            <el-input
              v-model="filterForm.companyName"
              placeholder="公司名称"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="职位名称">
            <el-input
              v-model="filterForm.positionName"
              placeholder="职位名称"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="filterForm.status">
              <el-option
                v-for="(item, index) in statusOptions"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="filter-oper">
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
      <el-table-column prop="companyName" label="公司名称" width="150" />
      <el-table-column prop="positionName" label="职位名称" width="150" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="status" label="状态" width="120">
        <template v-slot="scope">
          <el-text :type="statusMap[scope.row.status].type">{{
            statusMap[scope.row.status].text
          }}</el-text>
        </template>
      </el-table-column>
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
      <el-table-column prop="oper" label="操作" fixed="right" width="260">
        <template v-slot="scope">
          <el-button size="small" type="primary" @click="openDetail(scope.row)">
            查看简历
          </el-button>
          <el-popover
            placement="top"
            :width="120"
            trigger="click"
            :visible="scope.row.visible"
            v-if="scope.row.status === '001'"
          >
            <template #reference>
              <el-button
                size="small"
                @click="scope.row.visible = true"
                type="primary"
              >
                投递简历
              </el-button>
            </template>
            <div style="font-size: 12px; margin-bottom: 10px">
              确认投递简历？
            </div>
            <el-button size="small" @click="scope.row.visible = false"
              >取消</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleSubmit(scope.row)"
              >确定</el-button
            >
          </el-popover>
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
    <ResumeDetail v-model="detailDialog" :id="detailId" />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { resumesList, submitResume } from "@/api/recruitment";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";
import { ElMessage } from "element-plus";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const detailDialog = ref(false);
const tableData = ref([]);
const detailId = ref("");

const statusOptions = [
  { value: "", label: "全部" },
  { value: "001", label: "待投递" },
  { value: "002", label: "已投递" },
];
const statusMap = {
  "001": {
    type: "info",
    text: "待投递",
  },
  "002": {
    type: "success",
    text: "已投递",
  },
} as any;
// 过滤字段
const filterForm = reactive({
  companyName: "", // 公司名称
  positionName: "", // 职位名称
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
    const res = await resumesList({
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

// 搜索
const search = () => {
  pageParams.pageSize = 50;
  pageParams.currentPage = 1;
  getData();
};

// 初始化列表数据
search();

// 冻结/解冻
const handleSubmit = async (row: any) => {
  row.visible = false;
  try {
    await submitResume({ id: row.id });
    ElMessage.success("操作成功");
    getData();
  } catch (error) {}
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
const openDetail = (row: any) => {
  detailId.value = row.id;
  detailDialog.value = true;
};

// 重置
const reset = () => {
  filterForm.status = "";
  filterForm.companyName = "";
  filterForm.positionName = "";
};
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
  .form-content {
    display: flex;
  }
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
