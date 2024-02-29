<script setup lang="ts">
import { addDealer, editDealer } from "@/api/usedCar";
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
  name: "", // 名称
  address: "", // 地址
  contactPhone: "", // 联系电话
  status: "001", // 状态
});

const rules = reactive<FormRules>({
  name: [{ required: true, trigger: "change", message: "请输入经销商名称" }],
  address: [{ required: true, trigger: "change", message: "请输入地址" }],
  contactPhone: [
    { required: true, trigger: "change", message: "请输入联系电话" },
  ],
});

const status = ref("");
const statusOptions = [
  { value: "001", label: "可用" },
  { value: "090", label: "不可用" },
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
  await addDealer(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editDealer(data);
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
        : await edit({ ...formData, id: props.data.id });
      emit("update:modelValue", false);
      emit("refresh", operType.value);
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
        <el-form-item label="经销商名称" prop="name">
          <el-input v-model="formData.name" placeholder="经销商名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input
            v-model="formData.contactPhone"
            placeholder="联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="operType === 'edit'">
          <el-select v-model="status" disabled>
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
