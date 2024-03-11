<script setup lang="ts">
import { addJob, editJob, jobDetail } from "@/api/recruitment";
import { ElMessage, FormInstance } from "element-plus";
import useRules from "./formRules";

interface Props {
  modelValue: boolean;
  id?: string | number;
}
interface AnyObject {
  [key: string]: any;
}
const baseFormRef = ref<FormInstance>();
const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  id: "",
});

// 基本信息字段
const rules = useRules();
const jobForm = reactive<AnyObject>({
  companyId: "", // 公司Id
  companyName: "", // 公司名称
  companyType: "", // 公司类型
  city: "", // 所在城市
  keywords: "", // 关键字
  address: "", // 地址
  workingAge: "", // 工龄
  education: "", // 学历
  workDetails: "", // 工作详情
  url: "", // 跳转链接
  weight: "", // 优先级
  salary: "", // 薪资
  email: "", // 邮箱
});

const status = ref("");
const statusOptions = [
  { value: "000", label: "不展示" },
  { value: "001", label: "展示" },
];
const operType = computed(() => (!props.id ? "add" : "edit"));
const title = computed(() => (props.id ? "修改信息" : "新增"));
/** 打开 */
const open = () => {
  nextTick(() => {
    baseFormRef.value?.resetFields();
    if (props.id) {
      getDetail();
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
  await addJob(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editJob(data);
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

// 获取详情
const getDetail = async () => {
  const res = await jobDetail({ id: props.id });
  initFormFields(res.body);
};

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      operType.value === "add"
        ? await add({ ...jobForm })
        : await edit({ ...jobForm, id: props.id, status: status.value });
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
              <el-form-item label="公司名称" prop="companyName">
                <CompanySelect
                  v-model:companyId="jobForm.companyId"
                  v-model:companyName="jobForm.companyName"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="companyType">
                <el-input
                  v-model="jobForm.companyType"
                  placeholder="公司类型"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在城市" prop="city">
                <el-input v-model="jobForm.city" placeholder="所在城市" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="关键字" prop="keywords">
                <el-input v-model="jobForm.keywords" placeholder="关键字" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位名称" prop="name">
                <el-input v-model="jobForm.name" placeholder="岗位名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <el-input v-model="jobForm.address" placeholder="地址" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="工龄" prop="workingAge">
                <el-input
                  v-model="jobForm.workingAge"
                  placeholder="工龄"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历" prop="education">
                <el-input
                  v-model.number="jobForm.education"
                  placeholder="学历"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跳转链接" prop="url">
                <el-input v-model="jobForm.url" placeholder="跳转链接" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="优先级" prop="weight">
                <el-input
                  v-model="jobForm.weight"
                  placeholder="跳转优先级链接"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪资" prop="salary">
                <el-input v-model="jobForm.salary" placeholder="薪资" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="jobForm.email" placeholder="邮箱" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
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
          <el-form-item label="工作详情" prop="workDetails">
            <Wangeditor v-model="jobForm.workDetails" />
          </el-form-item>
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
