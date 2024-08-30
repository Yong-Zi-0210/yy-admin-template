<template>
  <el-dialog :model-value="props.modelValue" title="新增分类" @close="close" width="30%">
    <el-form :model="addForm" :rules="rules" ref="addRef">
      <el-form-item label="分类名称" prop="category">
        <el-input v-model="addForm.category" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { addCategory } from '@/api/file'
const addRef = ref<FormInstance>()
const addForm = reactive({
  category: ''
})
const rules = reactive<FormRules>({
  category: [{ required: true, trigger: 'change', message: '请输入分类名称' }]
})
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'refresh'])

const close = () => {
  emit('update:modelValue', false)
}

/** 新增 */
const confirm = () => {
  addRef.value?.validate(async val => {
    if (val) {
      try {
        await addCategory(addForm)
        emit('update:modelValue', false)
        ElMessage.success('新增成功')
        emit('refresh')
      } catch (error) {}
    }
  })
}
</script>
