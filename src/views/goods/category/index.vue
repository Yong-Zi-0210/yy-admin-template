<template>
  <div class="app-container">
    <el-button class="add-btn" type="primary" @click="addParent"
      >新增</el-button
    >
    <el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      @node-click="handleClick"
      v-loading="loading"
      :props="{
        label: 'categoryName',
        children: 'list',
      }"
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              v-if="node.level === 1"
              link
              type="primary"
              size="small"
              @click="addChildren(node)"
            >
              新增二级分类
            </el-button>
            <el-button
              v-if="node.level === 2"
              link
              size="small"
              type="primary"
              :loading="node.editLoading"
              @click="editRelation(node, 'add')"
            >
              添加关联品牌
            </el-button>
            <el-button
              v-if="node.level === 2"
              link
              size="small"
              type="primary"
              :loading="node.editLoading"
              @click="editRelation(node, 'edit')"
            >
              修改品牌信息
            </el-button>
            <el-button
              link
              size="small"
              type="warning"
              @click="handleEdit(node, data)"
            >
              编辑
            </el-button>
          </span>
        </span>
      </template>
    </el-tree>
    <!-- 新增/编辑分类 -->
    <GCategoryAddEdit
      v-model="addOrEditDialog"
      :data="detailData"
      :parentId="cateParentId"
      @refresh="getData"
    />
    <!-- 新增/编辑关联关系 -->
    <CateAndBrandRelation
      v-model="relationDialog"
      :data="relationData"
      :operType="operType"
      :categoryId="categoryId"
      @refresh="getData"
    />
  </div>
</template>

<script setup lang="ts">
import { goodsAllCategoryList, getBrandsByCategoryId } from "@/api/goods";

const loading = ref(false);
const addOrEditDialog = ref(false);
const relationDialog = ref(false);
const dataSource = ref([]);
const detailData = ref({});
const relationData = ref([]);
const cateParentId = ref(0);
const categoryId = ref(0);
const operType = ref("add");

// 列表请求
const getData = async () => {
  loading.value = true;
  try {
    const res = await goodsAllCategoryList();
    loading.value = false;
    dataSource.value = res.body.categories;
  } catch (error) {
    loading.value = false;
  }
};
// 初始化列表数据
getData();

// 新增一级分类
const addParent = () => {
  detailData.value = {};
  cateParentId.value = 0;
  addOrEditDialog.value = true;
};
// 新增二级分类
const addChildren = (node: any) => {
  console.log(node);
  detailData.value = {};
  cateParentId.value = node.data.categoryId;
  addOrEditDialog.value = true;
};

// 编辑
const handleEdit = (_node: any, row: any) => {
  console.log(row);
  addOrEditDialog.value = true;
  detailData.value = row;
};

// 添加、修改关联
const editRelation = async (node: any, type: string) => {
  categoryId.value = node.data.categoryId;
  node.editLoading = true;
  await getBrandsRelation();
  node.editLoading = false;
  operType.value = type;
  relationDialog.value = true;
};

// 获取已经关联的pinp
const getBrandsRelation = async () => {
  try {
    const res = await getBrandsByCategoryId({
      categoryId: categoryId.value,
    });
    relationData.value = res.body;
  } catch (error) {}
};
// 点击节点
const handleClick = (node: any) => {
  console.log(node);
};
</script>
<style lang="scss" scoped>
.add-btn {
  margin-bottom: 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
