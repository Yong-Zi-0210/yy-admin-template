<template>
  <div class="app-container">
    <div class="filter">
      <el-form :model="filterForm">
        <el-form-item label="经销商ID">
          <el-input v-model="filterForm.dealerId"></el-input>
        </el-form-item>
        <el-form-item label="二手车ID">
          <el-input v-model="filterForm.carId"></el-input>
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
      <el-table-column prop="carId" label="车辆ID" width="80" />
      <el-table-column prop="dealerId" label="经销商ID" width="100" />
      <el-table-column prop="dealer" label="经销商名称" width="150" />
      <el-table-column prop="carTitle" label="二手车名称" width="150" />
      <el-table-column prop="userRealName" label="用户姓名" width="120" />
      <el-table-column prop="userContactPhone" label="联系电话" width="120" />
      <el-table-column prop="confirmOperatorId" label="操作员ID" width="100" />
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-text
            v-if="scope.row.status === '001'"
            :type="statusMap[scope.row.status]"
            >{{ statusText[scope.row.status] }}</el-text
          >
          <el-text v-else :type="statusMap[scope.row.status]">{{
            statusText[scope.row.status]
          }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="confirmTime" label="商家确认时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.confirmTime" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="180">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
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
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { communication } from "@/api/communicate";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const tableData = ref([]);
const statusOptions = [
  { value: "", label: "全部" },
  { value: "001", label: "待沟通" },
  { value: "090", label: "已确认" },
];
const statusMap = {
  "001": "warning",
  "090": "success",
} as any;

const statusText = {
  "001": "代沟通",
  "090": "已确认",
} as any;

// 过滤字段
const filterForm = reactive({
  dealerId: "", // 经销商ID
  carId: "", // 二手车id
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
    const res = await communication({
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
// 重置
const reset = () => {
  filterForm.status = "";
};
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: flex-end;
  :deep(.el-form) {
    display: flex;
    .el-form-item {
      margin-right: 20px;
    }
  }
  .filter-oper {
    margin-left: 20px;
  }
}
.pagination {
  margin-top: 20px;
}
</style>
