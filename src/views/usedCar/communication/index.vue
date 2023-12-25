<template>
  <div class="app-contanier">
    <div class="filter"></div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="address" label="经销商名称" />
      <el-table-column prop="address" label="二手车名称" />
      <el-table-column prop="address" label="状态" />
      <el-table-column prop="address" label="创建时间" />
      <el-table-column prop="address" label="修改时间" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { communication } from "@/api/usedCar";
const tableData = ref([]);
const filterParams = reactive({
  status: "",
});

const getData = async () => {
  const res = await communication({
    ...filterParams,
  });
  console.log(res);
};
// 初始化列表数据
getData();
</script>
