<!-- 公司 -->
<template>
  <el-select
    v-model="position"
    filterable
    clearable
    @change="change"
    class="select"
    placeholder="请选择公司"
    :disabled="props.disabled"
  >
    <el-option
      v-for="(item, index) in jobOptions"
      :key="item.id"
      :label="item.name"
      :value="index"
    />
  </el-select>
</template>
<script setup lang="ts">
import { jobList } from "@/api/recruitment";

interface CompanyItem {
  id?: "";
  name?: "";
}

const position = ref("");
const jobOptions = ref<CompanyItem[]>([]);
const props = defineProps([
  "positionId",
  "positionName",
  "companyId",
  "disabled",
]);
const emit = defineEmits(["update:positionId", "update:positionName"]);

watch(
  () => props.positionId,
  () => {
    position.value = props.positionName;
  },
  { immediate: true }
);

watch(
  () => props.companyId,
  () => getList(props.companyId)
);

// 请求品牌列表数据
const getList = async (companyId: string) => {
  try {
    const res = await jobList({
      currentPage: 1,
      pageSize: 99999,
      condition: {
        companyId,
      },
    });
    jobOptions.value = res.body.pageItems;
  } catch (error) {}
};

const change = (index: number) => {
  emit("update:positionId", jobOptions.value[index]?.id);
  emit("update:positionName", jobOptions.value[index]?.name);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
