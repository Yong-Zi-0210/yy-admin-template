<template>
  <div class="app-container">
    <div class="filter">
      <el-button type="primary" @click="openDialog">新增</el-button>
      <div class="form-conetnt">
        <el-form :model="filterForm">
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
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :max-height="maxHeight"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column prop="displayImage" label="显示图片" width="90">
        <template v-slot="scope">
          <ImagePreview
            v-if="scope.row.displayImage"
            :src="scope.row.displayImage"
            :previewSrcList="[scope.row.displayImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="200" />
      <el-table-column prop="images" label="图片集" width="80">
        <template v-slot="scope">
          <ImagePreview
            v-if="scope.row.images[0]"
            :src="scope.row.images[0]"
            :preview-src-list="scope.row.images"
          />
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="120">
        <template v-slot="scope">
          <Tags :tags="scope.row.tag" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="车型" />
      <el-table-column prop="brand" label="品牌" />
      <el-table-column prop="address" label="状态" width="120">
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
      <el-table-column prop="oper" label="操作" fixed="right" width="180">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.status === '001'"
            size="small"
            type="warning"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-popover
            placement="top"
            :width="120"
            trigger="click"
            :visible="scope.row.visible"
          >
            <template #reference>
              <el-button
                size="small"
                @click="scope.row.visible = true"
                :type="scope.row.status === '002' ? 'danger' : 'primary'"
              >
                {{ scope.row.status === "002" ? "下架" : "上架" }}
              </el-button>
            </template>
            <div style="font-size: 12px; margin-bottom: 10px">
              {{ scope.row.status === "002" ? "确定下架?" : "确定上架?" }}
            </div>
            <el-button size="small" @click="scope.row.visible = false"
              >取消</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleSwitch(scope.row)"
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
        :page-sizes="[20, 50, 150, 300]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <AddOrEdit v-model="addOrEditDialog" :id="editId" @refresh="update" />
  </div>
</template>

<script setup lang="ts">
import { usedCarList, updateStatus } from "@/api/usedCar";
import { Condition } from "@/api/usedCar/types";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";
import { ElMessage } from "element-plus";

const loading = ref(false);
const addOrEditDialog = ref(false);
const editId = ref("");
const tableData = ref([]);
useTableHeight();
const statusOptions = [
  { value: "", label: "全部" },
  { value: "001", label: "从未上架" },
  { value: "002", label: "上架" },
  { value: "003", label: "下架" },
];
const statusMap = reactive<any>({
  "001": "从未上架",
  "002": "上架",
  "003": "下架",
});

const statusType = reactive<any>({
  "001": "info",
  "002": "success",
  "003": "danger",
});

// 过滤字段
const filterForm = reactive<Condition>({
  brandId: "",
  status: "",
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
    const res = await usedCarList({
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
// 删除
const handleSwitch = async (row: any) => {
  row.visible = false;
  await updateStatus({
    type: row.status !== "002" ? "002" : "003",
    id: row.id,
  });
  ElMessage.success("操作成功");
  search();
};
// 更新数据
const update = () => {
  search();
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
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  .form-conetnt {
    display: flex;
  }
  .filter-oper {
    margin-left: 20px;
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
