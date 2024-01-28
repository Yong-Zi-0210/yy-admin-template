<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="分类">
            <GoodsCategorySelect v-model:categoryId="filterForm.categoryId" />
          </el-form-item>
          <el-form-item label="品牌">
            <GoodsBrandSelect
              v-model:brandId="filterForm.brandId"
              :categoryId="filterForm.categoryId"
            />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="filterForm.goodsName" placeholder="商品名称" />
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
      <el-table-column prop="categoryName" label="分类名称" width="120" />
      <el-table-column prop="brandName" label="品牌名称" width="120" />
      <el-table-column prop="goodsName" label="商品名称" width="120" />
      <el-table-column prop="goodsTitle" label="商品标题" width="200" />
      <el-table-column prop="displayImage" label="显示图片" width="120">
        <template v-slot="scope">
          <ImagePreview
            v-if="scope.row.displayImage"
            :src="scope.row.displayImage"
            :previewSrcList="[scope.row.displayImage]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="points" label="积分" />
      <el-table-column prop="price" label="参考价" />
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <span>{{ statusMap[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
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
    <GoodsAddEdit v-model="addOrEditDialog" :id="detailId" @refresh="update" />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { goodsList } from "@/api/goods";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const addOrEditDialog = ref(false);
const tableData = ref([]);
const detailId = ref("");

const statusOptions = [
  { value: "", label: "全部" },
  { value: "001", label: "未上架" },
  { value: "002", label: "上架" },
  { value: "003", label: "下架" },
  { value: "004", label: "删除" },
  { value: "005", label: "售罄" },
];
const statusMap = {
  "001": "未上架",
  "002": "上架",
  "003": "下架",
  "004": "删除",
  "005": "售罄",
} as any;
// 过滤字段
const filterForm = reactive({
  status: "", // 状态
  categoryId: "", // 分类id
  brandId: "", // 商品品牌id
  goodsName: "", // 商品名称
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
    const res = await goodsList({
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

// 新增
const openDialog = () => {
  detailId.value = "";
  addOrEditDialog.value = true;
};

// 更新数据
// 编辑
const handleEdit = (row: any) => {
  addOrEditDialog.value = true;
  detailId.value = row.id;
};
const update = () => {
  search();
};

// 重置
const reset = () => {
  filterForm.status = "";
  filterForm.categoryId = "";
  filterForm.brandId = "";
  filterForm.goodsName = "";
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
