<!-- 热招岗位分类 -->
<template>
  <el-select
    v-model="categoryValue"
    filterable
    clearable
    @change="change"
    class="select"
    placeholder="请选择公司"
  >
    <el-option
      v-for="(item, index) in categoryOptions"
      :key="item.id"
      :label="item.name"
      :value="index"
    />
  </el-select>
</template>
<script setup lang="ts">
import { hotJobCategoty } from "@/api/recruitment";

interface CompanyItem {
  id?: "";
  name?: "";
}

const categoryValue = ref("");
const categoryOptions = ref<CompanyItem[]>([]);
const props = defineProps(["categoryId", "categoryName"]);
const emit = defineEmits(["update:categoryId", "update:categoryName"]);

watch(
  () => props.categoryId,
  () => {
    categoryValue.value = props.categoryName;
  },
  { immediate: true }
);

// 请求品牌列表数据
const getList = async () => {
  try {
    const res = await hotJobCategoty({
      currentPage: 1,
      pageSize: 9999,
      condition: {
        status: "",
      },
    });
    categoryOptions.value = res.body.pageItems;
  } catch (error) {}
};
getList();

const change = (index: number) => {
  emit("update:categoryId", categoryOptions.value[index]?.id);
  emit("update:categoryName", categoryOptions.value[index]?.name);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
