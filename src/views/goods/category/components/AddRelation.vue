<template>
  <div class="add-relation">
    <el-dialog
      :model-value="props.modelValue"
      :close-on-click-modal="false"
      :title="title"
      @close="close"
      @open="open"
      width="35%"
    >
      <el-form
        :model="relationItem"
        :rules="rules"
        ref="formRef"
        label-width="auto"
      >
        <el-form-item label="品牌名称" prop="brandId">
          <el-select v-model="relationItem.brandId" @change="brandChange">
            <el-option
              v-for="(item, index) in brandsOptions"
              :key="index"
              :value="item.brandId"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="relationItem.status">
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="weight">
          <el-input v-model="relationItem.weight" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { goodsAllBrands } from "@/api/goods";

const statusOptions = [
  { value: "001", label: "显示" },
  { value: "000", label: "不显示" },
];
// 基本信息字段
const relationItem = reactive<any>({
  brandId: "",
  name: "",
  displayImage: "",
  status: "",
  weight: "",
});
const rules = reactive<FormRules>({
  brandId: [{ required: true, trigger: "change", message: "请输选择品牌" }],
  status: [{ required: true, trigger: "change", message: "请选择状态" }],
  weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
});
interface Props {
  modelValue: boolean;
  categoryId?: number;
  editData?: any;
}

const formRef = ref<FormInstance>();
const loading = ref(false);
const brandsOptions = ref<any>([]);
const title = computed(() =>
  props.editData ? "修改关联品牌" : "新增关联品牌"
);
const emit = defineEmits(["update:modelValue", "handleConfirm"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

// 获取品牌列表
const getBrands = async () => {
  loading.value = true;
  try {
    const res = await goodsAllBrands();
    loading.value = false;
    brandsOptions.value = res.body;
  } catch (error) {
    loading.value = false;
  }
};
getBrands();

/** 关闭 */
const close = () => emit("update:modelValue", false);
// 弹窗显示
const open = () => {
  nextTick(() => {
    formRef.value?.resetFields();
    if (props.editData) {
      initFormFields(props.editData);
    }
  });
};
// 改变品牌
const brandChange = (brandId: number) => {
  const relation = brandsOptions.value.find(
    (item: any) => item.brandId === brandId
  );
  relationItem.name = relation.name;
  relationItem.displayImage = relation.displayImage;
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(relationItem, key)) {
      relationItem[key] = detail[key];
    }
  }
};

const confirm = () => {
  formRef.value?.validate(async (val) => {
    if (val) {
      emit("update:modelValue", false);
      emit("handleConfirm", {
        ...relationItem,
        categoryId: props.categoryId,
      });
    }
  });
};
</script>
