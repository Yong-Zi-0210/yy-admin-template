<!-- 商品品牌下拉 -->
<template>
  <el-select
    v-model="brandValue"
    filterable
    clearable
    @change="change"
    class="select"
    placeholder="品牌"
  >
    <el-option
      v-for="(item, index) in brandOptions"
      :key="index"
      :label="item.name"
      :value="item.brandId"
    />
  </el-select>
</template>
<script setup lang="ts">
import { getBrandsByCategoryId } from "@/api/goods";

interface Props {
  categoryId?: string | number;
  brandId?: string | number;
  brandName?: string | number;
}

const brandValue = ref();
const brandOptions = ref<any>([]);
const props = withDefaults(defineProps<Props>(), {
  categoryId: 0,
  brandId: "",
  brandName: "",
});
const emit = defineEmits(["update:brandId", "update:brandName"]);

watch(
  () => props.categoryId,
  () => {
    if (props.categoryId) {
      getList();
    }
  }
);

watch(
  () => props.brandId,
  () => {
    brandValue.value = props.brandId;
  }
);

// 请求品牌列表数据
const getList = async () => {
  try {
    const res = await getBrandsByCategoryId({
      categoryId: props.categoryId,
    });
    brandOptions.value = res.body;
  } catch (error) {}
};

const change = (value: number) => {
  const name = brandOptions.value.find(
    (item: any) => item.brandId === value
  )?.name;
  emit("update:brandId", value);
  emit("update:brandName", name);
};
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>
