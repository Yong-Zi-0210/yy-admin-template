<template>
  <div class="send-goods">
    <el-dialog
      :model-value="modelValue"
      :close-on-click-modal="false"
      @close="close"
      title="发货"
      width="35%"
    >
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item label="物流单号" prop="logistics">
          <el-input v-model="formData.logistics"></el-input>
        </el-form-item>
        <el-form-item label="寄出时间" prop="deliveryTime">
          <el-date-picker
            v-model="formData.deliveryTime"
            type="datetime"
            value-format="x"
            placeholder="日期时间"
          />
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
import { reactive, ref } from "vue";
import { FormRules, FormInstance, ElMessage } from "element-plus";
import { sendGoods } from "@/api/goods";
interface Props {
  modelValue: boolean;
  goodsOrderId: string;
}
const formData = reactive({
  deliveryTime: "", // 发货时间
  logistics: "", // 物流单号
});
const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  deliveryTime: [
    { required: true, trigger: "change", message: "请选择发货时间" },
  ],
  logistics: [{ required: true, trigger: "change", message: "请填写物流单号" }],
});
const prop = withDefaults(defineProps<Props>(), {
  modelValue: false,
  goodsOrderId: "",
});

const emit = defineEmits(["update:modelValue", "refresh"]);

/** 关闭 */
const close = () => emit("update:modelValue", false);

const confirm = () => {
  formRef.value?.validate(async (val) => {
    if (val) {
      try {
        await sendGoods({
          goodsOrderId: prop.goodsOrderId,
          ...formData,
        });
        emit("update:modelValue", false);
        ElMessage.success("操作成功");
        emit("refresh");
      } catch (error) {}
    }
  });
};
</script>
<style lang="scss" scoped>
.send-goods {
  :deep(.el-input) {
    width: 100%;
  }
}
</style>
