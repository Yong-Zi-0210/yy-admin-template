<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="城市">
            <el-input v-model="filterForm.city" placeholder="城市" />
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="filterForm.brand" placeholder="品牌" />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="filterForm.contactName" placeholder="联系人" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model="filterForm.contactPhone"
              placeholder="联系电话"
            />
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
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :max-height="maxHeight"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="city" label="城市" width="120" />
      <el-table-column prop="brand" label="品牌" width="120" />
      <el-table-column prop="carName" label="车名" width="120" />
      <el-table-column prop="contactName" label="联系人" width="120" />
      <el-table-column prop="contactPhone" label="联系电话" width="120" />
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-text :type="statusType[scope.row.status]">{{
            statusMap[scope.row.status]
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
      <el-table-column prop="oper" label="操作" fixed="right" width="150">
        <template v-slot="scope">
          <el-popover
            v-if="scope.row.status === '001'"
            placement="top"
            :width="120"
            trigger="click"
            :visible="scope.row.visible"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                @click.stop="scope.row.visible = true"
                >确认联系</el-button
              >
            </template>
            <div style="font-size: 12px; margin-bottom: 10px">确认已联系？</div>
            <el-button size="small" @click="scope.row.visible = false"
              >否</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="confirmContact(scope.row.id)"
              >是</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageParams.currentPage"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[20, 50, 150, 300]"
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
import { saleCarList, confirmContacted } from "@/api/usedCar";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

const loading = ref(false);
const tableData = ref([]);
useTableHeight();
const statusOptions = [
  { value: "", label: "全部" },
  { value: "001", label: "待联系" },
  { value: "002", label: "已联系" },
];
const statusMap = reactive<any>({
  "001": "待联系",
  "002": "已联系",
});
const statusType = reactive<any>({
  "001": "info",
  "002": "success",
  true: "success",
  false: "info",
});

// 过滤字段
const filterForm = reactive({
  city: "", // 城市
  brand: "", // 品牌
  contactName: "", // 联系人姓名
  contactPhone: "", // 联系人电话
  status: "", // 状态
});
// 分页信息
const total = ref(0);
const pageParams = reactive({
  currentPage: 1,
  pageSize: 20,
});

// 列表请求
const getData = async () => {
  loading.value = true;
  try {
    const res = await saleCarList({
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
  pageParams.currentPage = 1;
  pageParams.pageSize = 20;
  getData();
};

// 分配经销商
const confirmContact = async (id: string) => {
  try {
    await confirmContacted({ id });
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
// 重置
const reset = () => {
  filterForm.city = ""; // 城市
  filterForm.brand = ""; // 品牌
  filterForm.contactName = ""; // 联系人姓名
  filterForm.contactPhone = ""; // 联系人电话
  filterForm.status = ""; // 状态
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
      margin-bottom: 10px;
      margin-right: 24px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
.filter-oper {
  display: flex;
  justify-content: flex-end;
}
.pagination {
  margin-top: 20px;
}
</style>
