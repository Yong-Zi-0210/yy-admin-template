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
      v-for="item in categoryOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>
<script setup lang="ts">
import { hotJobCategoty } from "@/api/recruitment";

interface CompanyItem {
  id?: "";
  name?: "";
}

interface Props {
  categoryId: number | string;
  categoryName?: string;
  status?: string;
}

const categoryValue = ref<any>("");
const categoryOptions = ref<CompanyItem[]>([]);
const props = withDefaults(defineProps<Props>(), {
  categoryId: 0,
  categoryName: "",
  status: "",
});
const emit = defineEmits(["update:categoryId", "update:categoryName"]);

watch(
  () => props.categoryId,
  () => {
    categoryValue.value = props.categoryId;
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
        status: props.status,
      },
    });
    categoryOptions.value = res.body.pageItems;
  } catch (error) {}
};
getList();

const change = (value: number) => {
  const name = categoryOptions.value.find(
    (item: any) => item.id === value
  )?.name;
  emit("update:categoryId", value);
  emit("update:categoryName", name);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
