<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { addCategoryAndBrand, editCategoryAndBrand } from "@/api/goods";

interface Props {
  modelValue: boolean;
  operType: string;
  data?: any;
  categoryId?: number;
}

const emit = defineEmits(["update:modelValue", "refresh"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  categoryId: 0,
  operType: "add",
  data: () => {
    return [];
  },
});

const addDialog = ref(false);
const relationData = ref<any>([]);
const newAddRelation = ref<any>([]);
const editData = ref();
const title = computed(() =>
  props.operType === "edit" ? "修改品牌关联信息" : "新增品牌关联"
);

/** 打开 */
const open = async () => {
  nextTick(() => {
    if (props.data) {
      relationData.value = props.data;
    } else {
      relationData.value = [];
    }
  });
};
/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 新增弹窗
const addRealtion = async () => {
  addDialog.value = true;
};
const handleCallback = (relation: any) => {
  const exist = relationData.value.find(
    (item: any) => item.brandId === relation.brandId
  );
  if (!exist) {
    relationData.value.push(relation);
    newAddRelation.value.push(relation);
  } else {
    ElMessage.warning("已存在改关联品牌");
  }
};

// 编辑单条弹窗
const editRelation = (row: any) => {
  editData.value = row;
  addDialog.value = true;
};

// 编辑
const edit = async (data: object) => {
  await editCategoryAndBrand(data);
  ElMessage.success("修改成功");
};

/** 确认 */
const confirm = async () => {
  props.operType === "add"
    ? await addCategoryAndBrand({
        brands: newAddRelation.value,
      })
    : await edit({
        brands: relationData.value,
      });
  emit("update:modelValue", false);
};
</script>

<template>
  <div class="relation-dialog">
    <el-dialog
      :model-value="props.modelValue"
      :close-on-click-modal="false"
      :title="title"
      @open="open"
      @close="close"
      width="45%"
    >
      <template #default>
        <el-button
          v-if="props.operType === 'add'"
          type="primary"
          @click="addRealtion"
          >新增</el-button
        >
        <el-table :data="relationData">
          <el-table-column prop="brandId" label="品牌ID" width="80" />
          <el-table-column prop="name" label="品牌名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="weight" label="优先级" />
          <el-table-column v-if="operType === 'edit'" prop="oper" label="操作">
            <template v-slot="scope">
              <el-button type="warning" link @click="editRelation(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <AddRelation
      v-model="addDialog"
      :category-id="props.categoryId"
      :editData="editData"
      @handleConfirm="handleCallback"
    />
  </div>
</template>
<style scoped lang="scss">
.relation-dialog {
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
