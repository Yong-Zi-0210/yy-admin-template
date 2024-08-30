<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in data" :key="index">
      <el-image :src="item" fit="cover" />
      <el-icon v-if="isDelete" @click="handleDelete(index)"><CircleCloseFilled /></el-icon>
    </li>
  </ul>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string[] | string
  isDelete?: boolean
}
const data = ref<string[]>([])
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  isDelete: true
})

watch(
  () => props.modelValue,
  () => {
    if (typeof props.modelValue === 'string') {
      if (props.modelValue) {
        data.value = [props.modelValue]
      } else {
        data.value = []
      }
    } else {
      data.value = props.modelValue
    }
  }
)

const emit = defineEmits(['update:modelValue'])

const handleDelete = (index: number) => {
  data.value.splice(index, 1)
  if (typeof props.modelValue === 'string') {
    emit('update:modelValue', data.value[0] ? data.value[0] : '')
  } else {
    emit('update:modelValue', data.value)
  }
}
</script>
<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  min-height: 96px;
  max-height: 300px;
  overflow-y: auto;
  .list-item {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    &:hover {
      :deep(.el-icon) {
        display: block;
      }
    }
    :deep(.el-image) {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
    :deep(.el-icon) {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 16px;
      opacity: 0.6;
      display: none;
      cursor: pointer;
    }
  }
}
</style>
