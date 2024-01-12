<script setup lang="ts">
import { addHotJobCategoty, editHotJobCategoty } from "@/api/recruitment";
import { FormRules } from "element-plus";
import { ElMessage, FormInstance } from "element-plus";

interface Props {
  modelValue: boolean;
  data?: AnyObject;
}

interface AnyObject {
  [key: string]: any;
}
const baseFormRef = ref<FormInstance>();
const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  data: () => {
    return {};
  },
});

// 基本信息字段
const formData = reactive<AnyObject>({
  name: "", // 分类名称
  weight: "", // 优先级
});

const rules = reactive<FormRules>({
  name: [{ required: true, trigger: "change", message: "请输入分类名称" }],
  weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
});

const status = ref("");
const statusOptions = [
  { value: "000", label: "不展示" },
  { value: "001", label: "展示" },
];
const operType = computed(() => (!props.data ? "add" : "edit"));
const title = computed(() => (props.data ? "修改信息" : "新增"));
/** 打开 */
const open = () => {
  nextTick(() => {
    baseFormRef.value?.resetFields();
    if (props.data) {
      initFormFields(props.data);
    } else {
    }
  });
};
/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 新增
const add = async (data: object) => {
  await addHotJobCategoty(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editHotJobCategoty(data);
  ElMessage.success("修改成功");
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      formData[key] = detail[key];
    }
    status.value = detail.status;
  }
};

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      operType.value === "add"
        ? await add({ ...formData })
        : await edit({ ...formData, id: props.data.id, status: status.value });
      emit("update:modelValue", false);
      emit("refresh");
    }
  });
};
</script>

<template>
  <el-dialog
    :model-value="props.modelValue"
    :close-on-click-modal="false"
    :title="title"
    @open="open"
    @close="close"
    width="450px"
  >
    <template #default>
      <el-form
        :model="formData"
        :rules="rules"
        label-width="auto"
        ref="baseFormRef"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="weight">
          <el-input v-model="formData.weight" placeholder="优先级"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="operType === 'edit'">
          <el-select v-model="status">
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
