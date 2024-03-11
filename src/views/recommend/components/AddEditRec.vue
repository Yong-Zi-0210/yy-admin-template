<template>
  <div class="add-edit">
    <el-drawer
      :model-value="modelValue"
      :close-on-click-modal="false"
      @close="close"
      @open="open"
      :title="title"
      size="70%"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-width="auto"
        v-loading="loading"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="显示页面" prop="web">
              <el-select v-model="formData.web" @change="webChange">
                <el-option
                  v-for="(item, index) in webOprtions"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广告类型" prop="type">
              <el-select v-model="formData.type">
                <el-option
                  v-for="(item, index) in typeOptions[formData.web]"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优先级" prop="weight">
              <el-input
                v-model="formData.weight"
                placeholder="优先级"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" placeholder="名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="二级名称" prop="secondaryName">
              <el-input
                v-model="formData.secondaryName"
                placeholder="二级名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="三级名称" prop="description">
              <el-input v-model="formData.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="产品类型" prop="productType">
              <el-select
                v-model="formData.productType"
                @change="(type: string) => productTypeChange(type, '')"
              >
                <el-option
                  v-for="(item, index) in productTypeOptions"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品" prop="productId">
              <el-select
                v-model="formData.productId"
                filterable
                clearable
                remote
                reserve-keyword
                :remote-method="getProduct"
                :loading="remoteLoading"
                @clear="clearProduct"
              >
                <el-option
                  v-for="(item, index) in productOptions"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status">
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
        <el-form-item label="显示图片" prop="displayImage">
          <Image v-model="formData.displayImage" />
          <el-button type="primary" @click="uploadImage">选择图片</el-button>
        </el-form-item>
      </el-form>
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
      :limit="true"
      :limit-length="1"
      :default-value="defaultChcek"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, nextTick } from "vue";
import { FormRules, FormInstance, ElMessage } from "element-plus";
import { modifyRecommends, createRecommends } from "@/api/recommend";
import { usedCarList } from "@/api/usedCar";
import { unitList } from "@/api/recruitment";
import { goodsList } from "@/api/goods";
import { jobList } from "@/api/recruitment";
import { webOprtions, typeOptions, productTypeOptions } from "../constants";

interface Props {
  modelValue: boolean;
  data: any;
}
const loading = ref(false);
const remoteLoading = ref(false);
const uploadImageDialog = ref(false);
const defaultChcek = ref<any>([]);
const productOptions = ref<any>([]);
const statusOptions = [
  { value: "000", label: "隐藏" },
  { value: "001", label: "显示" },
];
const formData = reactive<any>({
  web: "", // 显示页面
  type: "", // 推荐类型
  name: "", // 名称
  secondaryName: "", // 二级名称
  productId: "", // 产品类型id
  productType: "", // 产品类型
  displayImage: "", // 显示图片
  description: "", // 第三级显示
  weight: "", // 优先级
  status: "001", // 状态
});
const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  web: [{ required: true, trigger: "change", message: "请输入显示页面" }],
  type: [{ required: true, trigger: "change", message: "请输入推荐类型" }],
  name: [{ required: true, trigger: "change", message: "请输入名称" }],
  secondaryName: [
    { required: true, trigger: "change", message: "请输入二级名称" },
  ],
  productId: [{ required: true, trigger: "change", message: "请选择产品" }],
  productType: [
    { required: true, trigger: "change", message: "请选择产品类型" },
  ],
  status: [{ required: true, trigger: "change", message: "请选择状态" }],
  displayImage: [{ required: true, trigger: "change", message: "请上传图片" }],
  description: [
    { required: true, trigger: "change", message: "请输入三级名称" },
  ],
  weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
});
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  data: {},
});
const operType = computed(() => (!props.data.id ? "add" : "edit"));
const title = computed(() => (props.data.id ? "修改信息" : "新增"));
const emit = defineEmits(["update:modelValue", "refresh"]);

/** 关闭 */
const close = () => emit("update:modelValue", false);

/** 打开 */
const open = () => {
  nextTick(async () => {
    formRef.value?.resetFields();
    productOptions.value = [];
    if (props.data.id) {
      loading.value = true;
      await productTypeChange(props.data.productType, "");
      loading.value = false;
      initFormFields(props.data);
    }
  });
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      formData[key] = detail[key];
    }
  }
};

// 远程搜索产品
const getProduct = async (query: string) => {
  if (query) {
    remoteLoading.value = true;
    await productTypeChange(formData.productType, query);
    remoteLoading.value = false;
  }
};
// 清空产品id
const clearProduct = () => {
  productTypeChange(formData.productType, "");
};

// web改变
const webChange = () => {
  formData.type = "";
};
const productTypeChange = (type: string, name: string) => {
  formData.productId = "";
  switch (type) {
    case "001": {
      return getUsedCarList(name);
    }
    case "002": {
      return getUnitList(name);
    }
    case "003": {
      return getGoodsList(name);
    }
    case "005": {
      return getJobList(name);
    }
  }
};

// 选择图片
const uploadImage = () => {
  defaultChcek.value = formData.displayImage ? [formData.displayImage] : [];
  uploadImageDialog.value = true;
};
//获取图片回调
const handleSelect = (data: string[]) => {
  formData.displayImage = data[0];
};

// 新增
const add = async (data: object) => {
  await createRecommends(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await modifyRecommends(data);
  ElMessage.success("修改成功");
};

const confirm = () => {
  formRef.value?.validate(async (val) => {
    if (val) {
      try {
        operType.value === "add"
          ? await add({ ...formData })
          : await edit({
              ...formData,
              id: props.data.id,
            });
        emit("update:modelValue", false);
        emit("refresh");
      } catch (error) {}
    }
  });
};

// 获取二手车数据
const getUsedCarList = async (name: string) => {
  try {
    const res = await usedCarList({
      pageSize: 100,
      currentPage: 1,
      condition: {
        name: name,
      },
    });
    const { body } = res;
    productOptions.value = body.pageItems?.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {}
};

// 获取招聘单位数据
const getUnitList = async (name: string) => {
  try {
    const res = await unitList({
      pageSize: 100,
      currentPage: 1,
      condition: {
        name: name,
      },
    });
    const { body } = res;
    productOptions.value = body.pageItems?.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {}
};
// 获取招聘职位数据
const getJobList = async (name: string) => {
  try {
    const res = await jobList({
      pageSize: 100,
      currentPage: 1,
      condition: {
        name: name,
      },
    });
    const { body } = res;
    productOptions.value = body.pageItems?.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {}
};

// 获取商品数据
const getGoodsList = async (goodsName: string) => {
  try {
    const res = await goodsList({
      pageSize: 100,
      currentPage: 1,
      condition: {
        name: goodsName,
      },
    });
    const { body } = res;
    productOptions.value = body.pageItems?.map((item: any) => ({
      value: item.id,
      label: item.goodsName,
    }));
  } catch (error) {}
};
</script>
<style lang="scss" scoped>
.add-edit {
  :deep(.el-form) {
    .el-select {
      width: 100%;
    }
  }
}
</style>
