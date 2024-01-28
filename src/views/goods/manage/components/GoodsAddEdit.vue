<script setup lang="ts">
import { goodsAdd, goodsEdit, goodsDetail } from "@/api/goods";
import useRules from "./formRules";
import { ElMessage, FormInstance } from "element-plus";

interface Props {
  modelValue: boolean;
  id?: string | number;
}
enum ImageTypes {
  displayImage = 1, // 显示图片
  images = 2, // 图集
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
const statusOptions = [
  { value: "001", label: "未上架" },
  { value: "002", label: "上架" },
  { value: "003", label: "下架" },
  { value: "004", label: "删除" },
  { value: "005", label: "售罄" },
];
const skuIndex = ref(0);
const baseRules = useRules();
const baseForm = reactive<AnyObject>({
  categoryId: "", // 分类id
  categoryName: "", // 分类名称
  brandId: "", // 品牌id
  brandName: "", // 品牌名称
  goodsName: "", // 商品名称
  goodsTitle: "", // 商品标题
  displayImage: "", // 显示图片
  description: "", // 描述
  points: "", // 积分
  price: "", // 参考价
  images: [], // 图片集
  status: "", // 状态
  weight: "", // 优先级
  specType: 0, // 规格类型
  specs: {}, // 规格结构
  goodsSkus: {}, // 款式
});
const specsList = ref([
  {
    key: "",
    value: "",
  },
]);
const goodsSkusList = ref<any>([
  {
    specKey: "", // 组合key
    stockQuantity: "", // 数量
    points: "", // 单个积分
    price: "", // 单个参考价
    image: "", // 图片
    barCode: "", // 商品码
    status: "", // 状态
    skuId: "", // 组合id
  },
]);
const operType = computed(() => (!props.id ? "add" : "edit"));
const title = computed(() => (props.id ? "修改信息" : "新增"));

/** 打开 */
const open = () => {
  nextTick(() => {
    const drawerDody = document.querySelector(".el-drawer__body");
    drawerDody?.scrollTo({ top: 0 });
    baseFormRef.value?.resetFields();
    if (props.id) {
      getDetail();
    } else {
      specsList.value = [
        {
          key: "",
          value: "",
        },
      ];
      goodsSkusList.value = [
        {
          specKey: "", // 组合key
          stockQuantity: "", // 数量
          points: "", // 单个积分
          price: "", // 单个参考价
          image: "", // 图片
          barCode: "", // 商品码
          status: "", // 状态
          skuId: "", // 组合id
        },
      ];
    }
  });
};

/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 新增
const add = async (data: object) => {
  await goodsAdd(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await goodsEdit(data);
  ElMessage.success("修改成功");
};

// 选择图片
const uploadImage = (value: number, index: number | boolean) => {
  if (value === 1) {
    limit.value = true;
    uploadLimitLength.value = 1;
    defaultChcek.value = baseForm.displayImage ? [baseForm.displayImage] : [];
  } else if (value === 3) {
    limit.value = true;
    uploadLimitLength.value = 1;
    skuIndex.value = index as number;
    defaultChcek.value = goodsSkusList.value[index as number].image
      ? [goodsSkusList.value[index as number].image]
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
  } else if (imageTypes.value === 3) {
    goodsSkusList.value[skuIndex.value].image = data[0];
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
    if (key === "goodsSkus") {
      goodsSkusList.value = getGoodsSkuTolist(detail[key]);
    }
    if (key === "specs") {
      specsList.value = getSpecsToList(detail[key]);
    }
  }
};

// 设置规款式数据提交结构
const setSkusData = (list: any[]) => {
  const map = {} as any;
  list.forEach((item: any) => {
    console.log(checkEmptyValues(item));
    if (!checkEmptyValues(item)) {
      map[item.specKey] = item;
    }
  });
  return map;
};
//设置规格参数提交格式
const setSpecData = (list: any) => {
  const map = {} as any;
  list.forEach((item: any) => {
    if (!checkEmptyValues(item)) {
      map[item.key] = item.value;
    }
  });
  return map;
};

// 获取接口返回的规格款式，并解构
const getSpecsToList = (map: any) => {
  const list = [];
  for (const key in map) {
    list.push({
      key,
      value: map[key],
    });
  }
  console.log(list);
  return list;
};
const getGoodsSkuTolist = (map: any) => {
  const list = [];
  for (const key in map) {
    list.push(map[key]);
  }
  return list;
};

// 新增规格参数
const addSpecs = () => {
  specsList.value.push({
    key: "",
    value: "",
  });
};

// 删除规格参数
const deleteSpecs = (index: number) => {
  specsList.value.splice(index, 1);
};

// 添加款式
const addSku = () => {
  goodsSkusList.value.push({
    specKey: "", // 组合key
    stockQuantity: "", // 数量
    points: "", // 单个积分
    price: "", // 单个参考价
    image: "", // 图片
    barCode: "", // 商品码
    status: "", // 状态
  });
};

// 删除款式
const deteleSku = (index: number) => {
  goodsSkusList.value.splice(index, 1);
};

// 获取详情
const getDetail = async () => {
  const res = await goodsDetail({ id: props.id });
  initFormFields(res.body);
};

// 校验款式和规格
const checkEmptyValues = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && !obj[key] && key !== "skuId") {
      return true;
    }
  }
  return false;
};

/** 确认 */
const confirm = () => {
  baseFormRef.value?.validate(async (validate) => {
    if (validate) {
      baseForm.goodsSkus = setSkusData(goodsSkusList.value);
      baseForm.specs = setSpecData(specsList.value);
      operType.value === "add"
        ? await add({ ...baseForm })
        : await edit({ ...baseForm, id: props.id });
      emit("update:modelValue", false);
      emit("refresh");
    } else {
      ElMessage.error("数据校验不通过");
    }
  });
};
</script>

<template>
  <div class="add-edit-dialog">
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
              <el-form-item label="商品分类" prop="categoryId">
                <GoodsCategorySelect
                  v-model:categoryId="baseForm.categoryId"
                  v-model:categoryName="baseForm.categoryName"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品品牌" prop="brandId">
                <GoodsBrandSelect
                  v-model:brandId="baseForm.brandId"
                  v-model:brandName="baseForm.brandName"
                  :category-id="baseForm.categoryId"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品名称" prop="goodsName">
                <el-input
                  v-model="baseForm.goodsName"
                  placeholder="商品名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="积分" prop="points">
                <el-input
                  v-model="baseForm.points"
                  placeholder="积分"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="参考价" prop="price">
                <el-input
                  v-model="baseForm.price"
                  placeholder="展示考价"
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
            <el-col :span="8">
              <el-form-item label="状态" prop="status">
                <el-select v-model="baseForm.status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格类型" prop="specType">
                <el-select v-model="baseForm.specType">
                  <el-option label="单规格" :value="0"></el-option>
                  <el-option label="多规格" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="图片集" prop="images">
            <Image v-model="baseForm.images" />
            <el-button type="primary" @click="uploadImage(2, false)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="显示图片" prop="displayImage">
            <Image v-model="baseForm.displayImage" />
            <el-button type="primary" @click="uploadImage(1, false)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-card>
            <template #header>规格参数</template>
            <el-alert
              class="tips"
              title="如存在空项，提交时会自动删除"
              type="warning"
            />
            <el-row
              :gutter="24"
              v-for="(item, index) in specsList"
              :key="index"
            >
              <el-col :span="8">
                <el-form-item label="规格名称">
                  <el-input
                    v-model="item.key"
                    placeholder="规格名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="规格值">
                  <el-input
                    v-model="item.value"
                    placeholder="规格值，多个值请用英文逗号“,”隔开"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" v-if="index > 0">
                <el-button type="danger" @click="deleteSpecs(index)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
            <el-button v-if="baseForm.specType" type="primary" @click="addSpecs"
              >添加规格</el-button
            >
          </el-card>
          <el-card>
            <template #header>款式</template>
            <el-alert
              class="tips"
              title="如存在空项，提交时会自动删除"
              type="warning"
            />
            <div
              class="sku-item"
              v-for="(item, index) in goodsSkusList"
              :key="index"
            >
              <el-form-item label="款式名称">
                <el-input
                  v-model="item.specKey"
                  placeholder="从规格值中选取，多种规格组合请用英文逗号“,”隔开"
                ></el-input>
              </el-form-item>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="展示价格">
                    <el-input
                      v-model="item.price"
                      placeholder="展示价格"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="库存">
                    <el-input v-model="item.stockQuantity" placeholder="库存" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="积分">
                    <el-input v-model="item.points" placeholder="积分" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="商品码">
                    <el-input
                      v-model="item.barCode"
                      placeholder="商品码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态">
                    <el-select v-model="item.status">
                      <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8"> </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="展示图片">
                    <Image v-model="item.image" />
                    <el-button type="primary" @click="uploadImage(3, index)"
                      >选择图片</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="index > 0">
                  <el-button type="danger" @click="deteleSku(index)"
                    >删除</el-button
                  >
                </el-col>
              </el-row>
            </div>
            <el-button type="primary" @click="addSku">添加款式</el-button>
          </el-card>
          <el-form-item label="商品标题" prop="goodsTitle">
            <el-input
              type="textarea"
              v-model="baseForm.goodsTitle"
              placeholder="商品标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <Wangeditor v-model="baseForm.description" />
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
.add-edit-dialog {
  .sku-item {
    margin-bottom: 10px;
    border-bottom: 1px dashed #d5dfea;
  }
  .tips {
    margin-bottom: 10px;
  }
  :deep(.el-form) {
    .el-select,
    .el-input {
      width: 100% !important;
    }
  }
  :deep(.el-card) {
    margin-bottom: 15px;
  }
}
</style>
