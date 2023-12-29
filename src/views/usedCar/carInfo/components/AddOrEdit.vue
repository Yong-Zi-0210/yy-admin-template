<script setup lang="ts">
import { addCar, editCar, detail } from "@/api/usedCar";
import config from "../paramsConfig";
import useRules from "./formRules";
import { ElMessage, FormInstance } from "element-plus";

interface Props {
  modelValue: boolean;
  id?: string | number;
}
enum ImageTypes {
  displayImage = 1, // 显示图片
  images = 2, // 图集
  checkReports = 3, // 检验图集
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
// 车辆信息
const carInfo = ref<AnyObject>([]);
// 基本信息
const baseRules = useRules();
const baseForm = reactive<AnyObject>({
  name: "奔驰c200L", // 车名
  city: "上海", // 城市
  price: "200000", // 价格
  displayImage: "", // 显示图片
  images: [] as any[], // 图集
  checkReports: [] as any[], // 车检报告图片
  description: "描述", // 描述
  tag: "省油", // 标签
  type: "轿车", // 车型
  brandId: "", // 品牌id
  brand: "", // 品牌名称
  firstPlateTime: "", // 首次上牌时间
  transferNum: "2", // 过户次数
  energy: "汽油", // 能源
  mileage: "200", // 里程
  carAge: "2", // 车龄
  transmission: "", // 变速箱
  displacement: "", // 排量
  emissionStandard: "200", // 排量标准
  drivingMeans: "4驱", // 驱动
});
const operType = computed(() => (!props.id ? "add" : "edit"));
const title = computed(() => (props.id ? "修改信息" : "新增"));
const disabled = computed(() => operType.value === "edit");
/** 打开 */
const open = () => {
  nextTick(() => {
    const drawerDody = document.querySelector(".el-drawer__body");
    drawerDody?.scrollTo({ top: 0 });
    baseFormRef.value?.resetFields();
    if (props.id) {
      getDetail();
    } else {
      carInfo.value = config.data.vehicleConfig;
    }
  });
};
/** 关闭 */
const close = () => {
  emit("update:modelValue", false);
};

// 新增
const add = async (data: object) => {
  await addCar(data);
  ElMessage.success("新增成功");
};

// 编辑
const edit = async (data: object) => {
  await editCar(data);
  ElMessage.success("修改成功");
};

// 选择图片
const uploadImage = (value: number) => {
  if (value === 1) {
    limit.value = true;
    uploadLimitLength.value = 1;
    defaultChcek.value = [baseForm.displayImage];
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
  console.log(baseForm[ImageTypes[imageTypes.value]]);
};

// 处理回显数据
const initFormFields = (detail: any) => {
  for (const key in detail) {
    if (Object.prototype.hasOwnProperty.call(baseForm, key)) {
      baseForm[key] = detail[key];
    }
    carInfo.value = JSON.parse(detail.params)?.data?.vehicleConfig;
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
      const params = JSON.stringify({ data: { vehicleConfig: carInfo.value } });
      operType.value === "add"
        ? await add({ ...baseForm, id: props.id, params })
        : await edit({ ...baseForm, id: props.id, params });
      emit("update:modelValue", false);
      emit("refresh");
    } else {
      ElMessage.error("数据校验不通过");
    }
  });
};
</script>

<template>
  <el-drawer
    :model-value="props.modelValue"
    :close-on-click-modal="false"
    :title="title"
    @open="open"
    @close="close"
    size="80%"
    class="dialog"
  >
    <template #default>
      <div class="base-info">
        <div class="header">基本信息</div>
        <el-form
          :model="baseForm"
          :rules="baseRules"
          label-width="auto"
          ref="baseFormRef"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="名称" prop="name">
                <el-input v-model="baseForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" prop="city">
                <el-input v-model="baseForm.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格" prop="price">
                <el-input v-model="baseForm.price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="品牌" prop="brandId">
                <Brand
                  v-model:brandId="baseForm.brandId"
                  v-model:brand="baseForm.brand"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车型" prop="type">
                <el-input v-model="baseForm.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="能源" prop="energy">
                <el-input v-model="baseForm.energy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="里程" prop="mileage">
                <el-input v-model="baseForm.mileage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车龄(年)" prop="carAge">
                <el-input v-model.number="baseForm.carAge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="过户次数" prop="transferNum">
                <el-input v-model="baseForm.transferNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="变速箱" prop="transmission">
                <el-input v-model="baseForm.transmission"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排量" prop="displacement">
                <el-input v-model="baseForm.displacement"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排放标准" prop="emissionStandard">
                <el-input v-model="baseForm.emissionStandard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="驱动" prop="drivingMeans">
                <el-input v-model="baseForm.drivingMeans"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标签" prop="tag">
                <el-input v-model="baseForm.tag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="首次上牌时间" prop="firstPlateTime">
                <el-date-picker
                  v-model="baseForm.firstPlateTime"
                  type="date"
                  value-format="x"
                  placeholder="请选择日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="车检报告图片" prop="checkReports">
            <Image :list="baseForm.checkReports" />
            <el-button type="primary" @click="uploadImage(3)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="图片集" prop="images">
            <Image :list="baseForm.images" />
            <el-button type="primary" @click="uploadImage(2)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="显示图片" prop="displayImage">
            <Image
              :list="baseForm.displayImage !== '' && [baseForm.displayImage]"
            />
            <el-button type="primary" @click="uploadImage(1)"
              >选择图片</el-button
            >
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="baseForm.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="car-info item" v-for="(item, index) in carInfo" :key="index">
        <div class="header">{{ item.name }}</div>
        <div class="config">
          <div class="config-item" v-for="(_value, key) in item.config">
            <span class="label">{{ key }}：</span>
            <input :disabled="disabled" v-model="item.config[key]" />
          </div>
        </div>
      </div>
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
</template>
<style scoped lang="scss">
.base-info {
  margin-bottom: 40px;
  :deep(.el-form) {
    .el-select,
    .el-input {
      width: 100%;
    }
  }
}
.header {
  color: #409eff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 16px;
  font-weight: 600;
}

.car-info {
  .config {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .config-item {
      display: flex;
      align-items: center;
      width: 30%;
      margin: 0 30px 5px 0;
      .label {
        display: inline-block;
        width: 385px;
        text-align: right;
        color: #606266;
        font-size: 13px;
      }
      input {
        background: transparent;
        color: #000;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
