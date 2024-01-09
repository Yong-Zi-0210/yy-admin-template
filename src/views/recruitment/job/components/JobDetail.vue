<template>
  <el-dialog
    title="职位详情"
    @close="close"
    :model-value="props.modelValue"
    :close-on-click-modal="false"
  >
    <template #default>
      <div v-html="props.detailContent" />
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
interface Props {
  modelValue: boolean;
  detailContent: string;
}
const props = withDefaults(defineProps<Props>(), {
  detailContent: "",
});
const emit = defineEmits(["update:modelValue"]);

// 关闭
const close = () => emit("update:modelValue", false);
</script>
