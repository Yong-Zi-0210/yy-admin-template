<template>
  <div class="add-edit">
    <el-dialog
      :model-value="modelValue"
      :close-on-click-modal="false"
      @close="close"
      @open="open"
      :title="title"
      width="35%"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formRef"
        label-width="auto"
      >
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
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
    </el-dialog>
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
import { goodsBrandsAdd, goodsBrandsEdit } from "@/api/goods";

interface Props {
  modelValue: boolean;
  data: any;
}
const uploadImageDialog = ref(false);
const defaultChcek = ref<any>([]);
const statusOptions = [
  { value: "001", label: "可用" },
  { value: "090", label: "不可用" },
];
const formData = reactive<any>({
  name: "", // 名称
  displayImage: "", // 显示图片
  status: "", // 状态
});
const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, trigger: "change", message: "请输入名称" }],
  status: [{ required: true, trigger: "change", message: "请选择状态" }],
  displayImage: [{ required: true, trigger: "change", message: "请上传图片" }],
});
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  data: {},
});
const operType = computed(() => (!props.data.brandId ? "add" : "edit"));
const title = computed(() => (props.data.brandId ? "修改信息" : "新增"));
const emit = defineEmits(["update:modelValue", "refresh"]);

/** 关闭 */
const close = () => emit("update:modelValue", false);

/** 打开 */
const open = () => {
  nextTick(() => {
    const drawerDody = document.querySelector(".el-drawer__body");
    drawerDody?.scrollTo({ top: 0 });
    formRef.value?.resetFields();
    if (props.data.brandId) {
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
  await goodsBrandsAdd(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await goodsBrandsEdit(data);
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
              id: props.data.brandId,
            });
        emit("update:modelValue", false);
        emit("refresh");
      } catch (error) {}
    }
  });
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
