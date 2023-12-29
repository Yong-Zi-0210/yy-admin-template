<template>
  <el-image
    style="width: 50px; height: 50px"
    :src="props.src"
    preview-teleported
    :preview-src-list="props.previewSrcList"
  >
    <template #error>
      <div class="image-slot">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>
<script setup lang="ts">
interface Props {
  src: string;
  previewSrcList: any;
}
const props = withDefaults(defineProps<Props>(), {
  src: "",
  previewSrcList: [],
});
</script>
