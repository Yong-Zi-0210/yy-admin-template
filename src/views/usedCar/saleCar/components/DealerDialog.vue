<template>
  <el-dialog
    title="分配经销商"
    @close="close"
    @open="open"
    width="450px"
    :model-value="props.modelValue"
    :close-on-click-modal="false"
  >
    <template #default>
      <el-form :model="formData">
        <el-form-item label="经销商">
          <el-select
            v-model="formData.dealerId"
            popper-class="more-select-dropdown"
            v-loadMore="loadMore"
          >
            <el-option
              v-for="item in options"
              :value="item.id"
              :label="item.name"
            />
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
<script setup lang="ts">
import { reactive, ref } from "vue";
import { dealerList, saleCarSelectDealer } from "@/api/usedCar";
import { ElMessage } from "element-plus";
interface Props {
  modelValue: boolean;
  id: string | number;
}

const options = ref<any>([]);
const total = ref(0);
const pageParams = reactive({
  currentPage: 1,
  pageSize: 10,
});
const formData = reactive({
  dealerId: "",
});
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});
const emit = defineEmits(["update:modelValue", "refresh"]);
// 关闭
const close = () => emit("update:modelValue", false);
const open = () => {
  nextTick(async () => {
    pageParams.currentPage = 1;
    pageParams.pageSize = 10;
    options.value = await getDealers();
  });
};
// 获取经销商列表
const getDealers = async () => {
  try {
    const res = await dealerList({
      ...pageParams,
      condition: {},
    });
    const { pageItems, totalCount } = res.body;
    total.value = totalCount;
    return pageItems;
  } catch (error) {}
};

const loadMore = async () => {
  if (options.value.length < total.value) {
    pageParams.currentPage++;
    const moreData = await getDealers();
    options.value = options.value.concat(moreData);
  }
};

/** 确认 */
const confirm = async () => {
  try {
    await saleCarSelectDealer({
      ...formData,
      id: props.id,
    });
    emit("update:modelValue", false);
    emit("refresh");
    ElMessage.success("操作成功");
  } catch (error) {}
};
</script>
