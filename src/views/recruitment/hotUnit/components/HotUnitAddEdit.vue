<script setup lang="ts">
import { addHotUint, editHotUnit } from "@/api/recruitment";
import useRules from "./formRules";
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
const baseRules = useRules();
const baseForm = reactive<AnyObject>({
  companyId: "", // 公司id
  companyName: "", // 公司名称
  companyType: "", // 公司类型
  financing: "", // 融资类型
  employeeNum: "", // 员工人数
  weight: 0, // 优先级
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
  await addHotUint(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editHotUnit(data);
  ElMessage.success("修改成功");
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(baseForm, key)) {
      baseForm[key] = detail[key];
    }
    status.value = detail.status;
  }
};

// 选择数据
const companyChange = (value: any) => {
  const {
    type, // 公司类型
    financing, // 融资类型
    employeeNum, // 员工人数
  } = value;
  baseForm.companyType = type;
  baseForm.financing = financing;
  baseForm.employeeNum = employeeNum;
};

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      operType.value === "add"
        ? await add({ ...baseForm })
        : await edit({ ...baseForm, id: props.data.id, status: status.value });
      emit("update:modelValue", false);
      emit("refresh");
    }
  });
};
</script>

<template>
  <div class="add-dialog">
    <el-drawer
      :model-value="props.modelValue"
      :close-on-click-modal="false"
      :title="title"
      @open="open"
      @close="close"
      size="80%"
    >
      <template #default>
        <el-form
          :model="baseForm"
          :rules="baseRules"
          label-width="auto"
          ref="baseFormRef"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公司名称" prop="companyName">
                <CompanySelect
                  v-model:companyName="baseForm.companyName"
                  v-model:companyId="baseForm.companyId"
                  @handleChange="companyChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="companyType">
                <el-input
                  v-model="baseForm.companyType"
                  placeholder="公司类型"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资类型" prop="financing">
                <el-input
                  v-model="baseForm.financing"
                  placeholder="融资类型"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="员工数" prop="employeeNum">
                <el-input
                  v-model="baseForm.employeeNum"
                  placeholder="员工数"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优先级" prop="weight">
                <el-input
                  v-model="baseForm.weight"
                  placeholder="优先级"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8" v-if="operType === 'edit'">
              <el-form-item label="状态">
                <el-select v-model="status">
                  <el-option
                    v-for="(item, index) in statusOptions"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
.add-dialog {
  :deep(.el-form) {
    .el-select,
    .el-input {
      width: 100%;
    }
  }
}
</style>
