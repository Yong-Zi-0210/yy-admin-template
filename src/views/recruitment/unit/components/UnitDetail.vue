<script setup lang="ts">
import { detail } from "@/api/recruitment";
import { FormInstance } from "element-plus";
interface Props {
  modelValue: boolean;
  id?: string | number;
}

interface AnyObject {
  [key: string]: any;
}
const title = ref("详情");
const baseFormRef = ref<FormInstance>();
const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  id: "",
});

// 基本信息字段
const baseForm = reactive<AnyObject>({
  name: "", // 公司名称
  financing: "", // 融资类型
  address: "", // 地址
  employeeNum: "", // 员工数
  type: "", // 公司类型
  tag: "", // 标签
  email: "", // 邮箱
  workTime: "", // 工作时间
  welfareTreatment: "", // 福利待遇
  profile: "", // 公司简介
  displayImage: "", // 显示图片
  images: [], // 图片集
  companyDetails: "", // 公司详情
  industryInformation: "", // 行业信息
});

const status = ref("");
const statusText = computed(() => {
  if (baseForm.status === "000") {
    return "不展示";
  } else {
    return "展示";
  }
});
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

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(baseForm, key)) {
      baseForm[key] = detail[key];
    }
    status.value = detail.status;
  }
};

// 获取详情
const getDetail = async () => {
  const res = await detail({ id: props.id });
  initFormFields(res.body);
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
        <el-form :model="baseForm" label-width="auto" ref="baseFormRef">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="公司名称" prop="name">
                <span>{{ baseForm.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="type">
                <span>{{ baseForm.type }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="融资类型" prop="financing">
                <span>{{ baseForm.financing }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="员工数" prop="employeeNum">
                <span>{{ baseForm.employeeNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标签" prop="tag">
                <span>{{ baseForm.tag }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作时间" prop="workTime">
                <span>{{ baseForm.workTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <span>{{ baseForm.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="福利待遇" prop="welfareTreatment">
                <span>{{ baseForm.welfareTreatment }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <span>{{ statusText }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-form-item label="邮箱" prop="email">
              <span>{{ baseForm.email }}</span>
            </el-form-item>
          </el-row>
          <el-form-item label="显示图片" prop="displayImage">
            <Image v-model="baseForm.displayImage" :isDelete="false" />
          </el-form-item>
          <el-form-item label="图片集" prop="images">
            <Image v-model="baseForm.images" :isDelete="false" />
          </el-form-item>
          <el-form-item label="公司简介" prop="profile">
            <span>{{ baseForm.profile }}</span>
          </el-form-item>
          <el-form-item label="公司详情" prop="companyDetails">
            <span>{{ baseForm.companyDetails }}</span>
          </el-form-item>
          <el-form-item label="行业信息" prop="industryInformation">
            <span>{{ baseForm.industryInformation }}</span>
          </el-form-item>
        </el-form>
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
