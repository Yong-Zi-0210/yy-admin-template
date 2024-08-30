<template>
  <el-tag v-for="(item, index) in tags" :key="index" size="small" class="table-tag">
    {{ item }}</el-tag
  >
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  tags: string
}
const props = withDefaults(defineProps<Props>(), {
  tags: '标签'
})

const tags = computed(() => props.tags.split('|').map(item => item))
</script>
<style lang="scss" scoped>
.table-tag {
  margin-right: 5px;
}
</style>
