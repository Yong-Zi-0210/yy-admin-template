<!-- 商品分类下拉 -->
<template>
  <el-select
    v-model="categoryValue"
    filterable
    clearable
    @change="change"
    class="select"
    placeholder="分类"
  >
    <el-option
      v-for="(item, index) in categoryOptions"
      :key="index"
      :label="item.categoryName"
      :value="item.categoryId"
    />
  </el-select>
</template>
<script setup lang="ts">
import { goodsAllCategoryList } from "@/api/goods";

const categoryValue = ref("");
const categoryOptions = ref<any>([]);
const props = defineProps(["categoryId", "categoryName"]);
const emit = defineEmits(["update:categoryId", "update:categoryName"]);
watch(
  () => props.categoryId,
  () => {
    categoryValue.value = props.categoryId;
  }
);

// 请求品牌列表数据
const getList = async () => {
  try {
    const res = await goodsAllCategoryList();
    const list: any[] = [];
    res.body.categories.forEach((item: any) => {
      list.push(...item.list);
    });
    categoryOptions.value = list;
  } catch (error) {}
};
getList();

const change = (value: number[]) => {
  const categoryName = categoryOptions.value.find(
    (item: any) => item.categoryId === value
  )?.categoryName;
  emit("update:categoryId", value);
  emit("update:categoryName", categoryName);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
