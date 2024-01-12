<template>
  <el-dialog
    :model-value="props.modelValue"
    :close-on-click-modal="false"
    title="选择图片"
    @open="init"
    @close="close"
    width="60%"
  >
    <div class="oper-options">
      <el-select v-model="type" filterable @change="handleChange">
        <el-option
          v-for="item in typeOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 12px" @click="addCategory"
        >新增分类</el-button
      >
      <el-button type="primary" @click="handleUpload">上传图片</el-button>
      <el-upload
        action="#"
        v-show="false"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="uploadChange"
        :before-upload="() => false"
        style="margin-left: 12px"
      >
        <el-button type="primary" ref="uploadRef">上传图片</el-button>
      </el-upload>
    </div>
    <div class="container" v-loading="loading">
      <div class="not-data" v-if="!imagesData.length">
        <SvgIcon name="not-data" />
      </div>
      <ul class="image-list" v-else>
        <li v-for="item in imagesData" class="image-item">
          <el-image
            :src="item.downloadUrl"
            style="height: 100%"
            fit="cover"
          ></el-image>
          <label
            v-show="checkList.includes(item.downloadUrl)"
            class="item-status-label"
          >
            <el-icon><Check /></el-icon>
          </label>
          <span class="item-actions">
            <span
              class="item-preview"
              @click="handlePictureCardPreview(item.downloadUrl)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              class="item-check"
              :class="checkList.includes(item.downloadUrl) && 'check'"
              @click="handleCheck(item, checkList.includes(item.downloadUrl))"
            >
              <el-icon><CircleCheckFilled /></el-icon>
            </span>
            <span class="item-delete" @click="handleRemove(item.id)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageParams.currentPage"
        v-model:page-size="pageParams.pageSize"
        :page-sizes="[10, 25, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
    <AddCategory v-model="addDialog" @refresh="getImageCategories" />
    <el-dialog v-model="previewDialog" :append-to-body="true" width="60%">
      <img w-full :src="previewImageUrl" style="width: 100%" />
    </el-dialog>
  </el-dialog>
</template>
<script setup lang="ts">
import { UploadFile, UploadFiles } from "element-plus";
import useUserStore from "@/store/module/user";
import { imageCategories, images, upload, remove } from "@/api/file";
import { ElMessage } from "element-plus";

interface Props {
  modelValue: boolean;
  limit?: boolean;
  limitLength?: number;
  defaultValue?: any;
}
interface TypeItem {
  id: number;
  name: string;
}
interface PageParams {
  pageSize: number;
  currentPage: number;
}

const uploadRef = ref(null);
const loading = ref(false);
const addDialog = ref(false);
const previewDialog = ref(false);
const previewImageUrl = ref("");
const type = ref(1);
const total = ref(0);
const categoryId = ref(1);
const checkList = ref<string[]>([]);
const typeOptions = ref<TypeItem[]>([]);
const imagesData = ref<any>([]);
const pageParams = reactive<PageParams>({
  pageSize: 10,
  currentPage: 1,
});
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  limit: false,
  defaultValue: [],
});
const emit = defineEmits(["update:modelValue", "check"]);

/** 初始化 */
const init = async () => {
  await resetCheck();
  await getImageCategories();
  await getImages();
};

// 重置数据
const resetCheck = async () => {
  pageParams.currentPage = 1;
  pageParams.pageSize = 10;
  categoryId.value = 1;
};

watch(
  () => props.defaultValue,
  () => {
    checkList.value = props.defaultValue;
  }
);

/** 新增分类 */
const addCategory = () => {
  addDialog.value = true;
};
/** 上传图片 */
const handleUpload = () => {
  if (!typeOptions.value) {
    return ElMessage.warning("请先新增后再选择类型");
  } else if (!type.value) {
    return ElMessage.warning("请先选择类型");
  } else {
    (uploadRef.value as any).$el.click();
  }
};
const userStore = useUserStore();
const uploadChange = async (file: UploadFile, _files: UploadFiles) => {
  try {
    await upload({
      dealerId: userStore.userInfo.dealerId,
      categoryId: type.value,
      file: file.raw,
    });
    ElMessage.success("上传成功");
    getImages();
  } catch (error) {}
};

/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 获取图片分类
const getImageCategories = async () => {
  try {
    const res = await imageCategories();
    typeOptions.value = res.body;
  } catch (error) {}
};

// 获取对应分类的图片数据
const getImages = async () => {
  loading.value = true;
  try {
    const res = await images({
      ...pageParams,
      condition: { categoryId: categoryId.value },
    });
    loading.value = false;
    const { body } = res;
    total.value = body.totalCount;
    imagesData.value = body?.pageItems;
  } catch (error) {
    loading.value = false;
  }
};
const handleChange = (value: number) => {
  pageParams.currentPage = 1;
  pageParams.pageSize = 10;
  categoryId.value = value;
  getImages();
};

// 预览图片
const handlePictureCardPreview = (url: string) => {
  previewImageUrl.value = url;
  previewDialog.value = true;
};
// 下载图片
const handleCheck = (item: any, check: boolean) => {
  // 超出限制不能选择
  if (props.limit && checkList.value.length === props.limitLength) {
    if (check) {
      const index = checkList.value.indexOf(item.downloadUrl);
      checkList.value.splice(index, 1);
    } else {
      return ElMessage.warning("最多选择一张");
    }
  }
  if (check) {
    const index = checkList.value.indexOf(item.downloadUrl);
    checkList.value.splice(index, 1);
  } else {
    checkList.value.push(item.downloadUrl);
  }
};
// 输出图片
const handleRemove = async (id: string) => {
  try {
    await remove({ id });
    ElMessage.success("删除成");
    getImages();
  } catch (error) {}
};
// 修改每页数量
const handleSizeChange = (value: number) => {
  pageParams.pageSize = value;
  getImages();
};

// 改变当前页
const handleCurrentChange = (value: number) => {
  pageParams.currentPage = value;
  getImages();
};

/** 确认 */
const confirm = () => {
  emit("update:modelValue", false);
  emit("check", checkList.value);
};
</script>
<style scoped lang="scss">
.oper-options {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.not-data {
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 100px;
  }
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  height: 350px;
  overflow-y: auto;
  .image-item {
    position: relative;
    list-style: none;
    width: 146px;
    height: 146px;
    margin: 0 8px 8px 0;
    border-radius: 6px;
    overflow: hidden;
    .item-status-label {
      position: absolute;
      display: inline-flex;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: var(--el-color-success);
      text-align: center;
      transform: rotate(45deg);
      justify-content: center;
      align-items: center;
      transition: opacity var(--el-transition-duration);
      :deep(.el-icon) {
        margin-top: 11px;
        color: #fff;
        font-size: 12px;
        transform: rotate(-45deg);
      }
    }
  }
  .item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3;
    span {
      cursor: pointer;
    }
    .item-check.check {
      color: greenyellow;
    }
    span + span {
      margin-left: 1rem;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
