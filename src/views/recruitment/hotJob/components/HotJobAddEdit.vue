<script setup lang="ts">
import { addHotJob, editHotJob } from "@/api/recruitment";
import { ElMessage, FormInstance } from "element-plus";
import useRules from "./formRules";
import JobCategorySelect from "@/views/components/JobCategorySelect.vue";
import JobSelect from "@/views/components/JobSelect.vue";

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
const rules = useRules();
const jobForm = reactive<AnyObject>({
  categoryId: "", // 分类id
  categoryName: "", // 分类名称
  positionId: "", // 职位id
  name: "", // 职位名称
  salary: "", // 薪资
  city: "", // 所在城市
  workingAge: "", // 工龄
  education: "", // 学历
  keywords: "", // 关键字
  companyId: "", // 公司id
  companyName: "", // 公司名称
  companyType: "", // 公司类型
  financing: "", // 融资类型
  weight: "", // 优先级
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
    jobForm.categoryName = "";
    jobForm.name = "";
    if (props.data) {
      initFormFields(props.data);
    }
  });
};
/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 新增
const add = async (data: object) => {
  await addHotJob(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editHotJob(data);
  ElMessage.success("修改成功");
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(jobForm, key)) {
      jobForm[key] = detail[key];
    }
    status.value = detail.status;
  }
};

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      operType.value === "add"
        ? await add({ ...jobForm })
        : await edit({ ...jobForm, id: props.data.id, status: status.value });
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
          :model="jobForm"
          :rules="rules"
          label-width="auto"
          ref="baseFormRef"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="分类名称" prop="categoryId">
                <JobCategorySelect
                  v-model:category-id="jobForm.categoryId"
                  v-model:category-name="jobForm.categoryName"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关键字" prop="keywords">
                <el-input
                  v-model="jobForm.keywords"
                  placeholder="关键字"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪资" prop="salary">
                <el-input
                  v-model="jobForm.salary"
                  placeholder="薪资"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="所在城市" prop="city">
                <el-input
                  v-model="jobForm.city"
                  placeholder="所在城市"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工龄" prop="workingAge">
                <el-input
                  v-model="jobForm.workingAge"
                  placeholder="工龄"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label="学历" prop="education">
                <el-input
                  v-model.number="jobForm.education"
                  placeholder="学历"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公司名称" prop="companyName">
                <CompanySelect
                  v-model:companyId="jobForm.companyId"
                  v-model:companyName="jobForm.companyName"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位名称" prop="positionId">
                <JobSelect
                  v-model:position-id="jobForm.positionId"
                  v-model:position-name="jobForm.name"
                  :company-id="jobForm.companyId"
                  :disabled="!jobForm.companyId"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="companyType">
                <el-input
                  v-model="jobForm.companyType"
                  placeholder="公司类型"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="融资类型" prop="financing">
                <el-input
                  v-model="jobForm.financing"
                  placeholder="融资类型"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优先级" prop="weight">
                <el-input
                  v-model="jobForm.weight"
                  placeholder="优先级"
                ></el-input>
              </el-form-item>
            </el-col>
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
