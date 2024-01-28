<template>
  <div class="app-container">
    <div class="filter">
      <div class="form-content">
        <el-form :model="filterForm">
          <el-form-item label="订单ID">
            <el-input v-nodel="filterForm.goodsOrderId" placeholder="订单ID" />
          </el-form-item>
          <el-form-item label="物流单号">
            <el-input
              v-model:brandId="filterForm.logistics"
              placeholder="物流单号"
            />
          </el-form-item>
          <el-form-item label="寄出时间">
            <el-date-picker
              v-model="filterForm.deliveryTime"
              type="datetime"
              value-format="x"
              placeholder="日期时间"
            />
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
      <el-table-column prop="goodsName" label="商品名称" width="120" />
      <el-table-column prop="points" label="单件积分" width="120" />
      <el-table-column prop="totalPoints" label="总消耗积分" width="150" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="status" label="状态">
        <template v-slot="scope">
          <el-text :type="statusType[scope.row.status]">{{
            statusMap[scope.row.status]
          }}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="发货时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.deliveryTime" />
        </template>
      </el-table-column>
      <el-table-column prop="logistics" label="物流单号" width="150" />
      <el-table-column prop="deliveryName" label="收件人" />
      <el-table-column prop="deliveryPhone" label="收件人手机号" width="160" />
      <el-table-column prop="deliveryAddress" label="收货地址" width="220" />
      <el-table-column prop="deliveryArea" label="收货地区" width="200" />
      <el-table-column prop="orderNo" label="订单编号" width="120" />
      <el-table-column prop="image" label="商品图片" width="120">
        <template v-slot="scope">
          <ImagePreview
            v-if="scope.row.image"
            :src="scope.row.image"
            :previewSrcList="[scope.row.image]"
          />
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="160">
        <template v-slot="scope">
          <FromatDate :time="scope.row.createTime" />
        </template>
      </el-table-column>
      <el-table-column prop="oper" label="操作" fixed="right" width="150">
        <template v-slot="scope">
          <el-button size="small" type="primary" @click="detail(scope.row)">
            详情
          </el-button>
          <el-button
            v-if="scope.row.status === '001'"
            size="small"
            type="success"
            @click="deliver(scope.row)"
          >
            去发货
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
    <GoodsOrderDetail v-model="addOrEditDialog" :detail="detailData" />
    <SendGoods
      v-model="sendGoodsDialog"
      :goodsOrderId="goodsOrderId"
      @refresh="search"
    />
  </div>
</template>

<script setup lang="ts">
import FromatDate from "@/views/components/FromatDate.vue";
import { goodsOrderList } from "@/api/goods";
import { maxHeight, useTableHeight } from "@/hooks/useTableHeight";

useTableHeight(); // 动态修改表格高度
const loading = ref(false);
const addOrEditDialog = ref(false);
const sendGoodsDialog = ref(false);
const goodsOrderId = ref();
const tableData = ref([]);
const detailData = ref();

const statusType = {
  "001": "success",
  "002": "primary",
  "003": "info",
  "004": "info",
} as any;
const statusMap = {
  "001": "已支付",
  "002": "已发货",
  "003": "已完成",
  "004": "已关闭",
} as any;
// 过滤字段
const filterForm = reactive({
  deliveryTime: "", // 寄出时间
  goodsOrderId: "", // 订单ID
  logistics: "", // 物流单号
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
    const res = await goodsOrderList({
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

// 详情
const detail = (row: any) => {
  addOrEditDialog.value = true;
  detailData.value = row;
};

// 发货
const deliver = (row: any) => {
  goodsOrderId.value = row.goodsOrderId;
  sendGoodsDialog.value = true;
};

// 重置
const reset = () => {
  filterForm.deliveryTime = ""; // 寄出时间
  filterForm.goodsOrderId = ""; // 订单ID
  filterForm.logistics = ""; // 物流单号
};
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  padding-bottom: 15px;
  justify-content: flex-end;
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
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
