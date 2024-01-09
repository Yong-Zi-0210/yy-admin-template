<!-- 公司 -->
<template>
  <el-select
    v-model="companyNameValue"
    filterable
    clearable
    @change="change"
    class="select"
    placeholder="请选择公司"
  >
    <el-option
      v-for="(item, index) in companyOptions"
      :key="item.id"
      :label="item.name"
      :value="index"
    />
  </el-select>
</template>
<script setup lang="ts">
import { allUnitList } from "@/api/recruitment";

interface CompanyItem {
  id?: "";
  name?: "";
}

const companyNameValue = ref("");
const companyOptions = ref<CompanyItem[]>([]);
const props = defineProps(["companyId", "companyName"]);
const emit = defineEmits(["update:companyId", "update:companyName"]);

watch(
  () => props.companyName,
  () => {
    companyNameValue.value = props.companyName;
  },
  { immediate: true }
);

// 请求品牌列表数据
const getBrands = async () => {
  try {
    const res = await allUnitList();
    companyOptions.value = res.body;
  } catch (error) {}
};
getBrands();

const change = (index: number) => {
  emit("update:companyId", companyOptions.value[index]?.id);
  emit("update:companyName", companyOptions.value[index]?.name);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
