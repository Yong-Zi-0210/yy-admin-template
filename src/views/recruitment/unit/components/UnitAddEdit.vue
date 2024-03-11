<script setup lang="ts">
import { addUnit, editUnit, detail } from "@/api/recruitment";
import useRules from "./formRules";
import { ElMessage, FormInstance } from "element-plus";

interface Props {
  modelValue: boolean;
  id?: string | number;
}
enum ImageTypes {
  displayImage = 1, // 显示图片
  images = 2, // 图片集
}
interface AnyObject {
  [key: string]: any;
}
const uploadImageDialog = ref(false);
const uploadLimitLength = ref(1);
const defaultChcek = ref<string[]>([]);
const limit = ref(false);
const imageTypes = ref(1);
const baseFormRef = ref<FormInstance>();
const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  id: "",
});

// 基本信息字段
const baseRules = useRules();
const baseForm = reactive<AnyObject>({
  name: "", // 公司名称
  financing: "", // 融资类型
  address: "", // 地址
  employeeNum: "", // 员工数
  type: "", // 公司类型
  tag: "", // 标签
  workTime: "", // 工作时间
  welfareTreatment: "", // 福利待遇
  profile: "", // 公司简介
  displayImage: "", // 显示图片
  images: [], // 图片集
  companyDetails: "", // 公司详情
  industryInformation: "", // 行业信息
  weight: "", // 优先级
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
  await addUnit(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editUnit(data);
  ElMessage.success("修改成功");
};

// 选择图片
const uploadImage = (value: number) => {
  if (value === 1) {
    limit.value = true;
    uploadLimitLength.value = 1;
    defaultChcek.value = baseForm.displayImage?.length
      ? [baseForm.displayImage]
      : [];
  } else {
    limit.value = false;
    defaultChcek.value = baseForm[ImageTypes[value]];
  }
  uploadImageDialog.value = true;
  imageTypes.value = value;
};

// 选择图片回调
const handleSelect = (data: string[]) => {
  // 显示图片每次都覆盖
  if (imageTypes.value === 1) {
    baseForm[ImageTypes[imageTypes.value]] = data[0];
  } else {
    let arr = baseForm[ImageTypes[imageTypes.value]].concat(data);
    arr = [...new Set(arr)];
    baseForm[ImageTypes[imageTypes.value]] = arr;
  }
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

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      operType.value === "add"
        ? await add({ ...baseForm })
        : await edit({ ...baseForm, id: props.id, status: status.value });
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
              <el-form-item label="公司名称" prop="name">
                <el-input
                  v-model="baseForm.name"
                  placeholder="公司名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司类型" prop="type">
                <el-input
                  v-model="baseForm.type"
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
              <el-form-item label="标签" prop="tag">
                <el-input
                  v-model="baseForm.tag"
                  placeholder="多个标签用｜线隔开"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作时间" prop="workTime">
                <el-input
                  v-model="baseForm.workTime"
                  placeholder="工作时间"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="地址" prop="address">
                <el-input
                  v-model="baseForm.address"
                  placeholder="地址"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="福利待遇" prop="welfareTreatment">
                <el-input
                  v-model="baseForm.welfareTreatment"
                  placeholder="多种福利用｜线隔开"
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
            <el-col :span="8">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="baseForm.email" placeholder="邮箱" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="显示图片" prop="displayImage">
            <Image v-model="baseForm.displayImage" />
            <el-button type="primary" @click="uploadImage(1)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="图片集" prop="images">
            <Image v-model="baseForm.images" />
            <el-button type="primary" @click="uploadImage(2)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="公司简介" prop="profile">
            <el-input
              type="textarea"
              v-model="baseForm.profile"
              placeholder="公司简介"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司详情" prop="companyDetails">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="公司详情"
              v-model="baseForm.companyDetails"
            ></el-input>
          </el-form-item>
          <el-form-item label="行业信息" prop="industryInformation">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="行业信息"
              v-model="baseForm.industryInformation"
            ></el-input>
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
    <UploadImage
      v-model="uploadImageDialog"
      @check="handleSelect"
      :limit="limit"
      :limit-length="uploadLimitLength"
      :default-value="defaultChcek"
    />
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
