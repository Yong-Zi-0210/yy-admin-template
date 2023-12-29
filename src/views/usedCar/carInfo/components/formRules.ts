import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: "change", message: "请输入名称" }],
    city: [{ required: true, trigger: "change", message: "请输入城市" }],
    price: [{ required: true, trigger: "change", message: "请输入价格" }],
    displayImage: [
      { required: true, trigger: "change", message: "请上传显示图片" },
    ],
    images: [{ required: true, trigger: "change", message: "请上传图集" }],
    checkReports: [
      { required: true, trigger: "change", message: "请上传车检报告图集" },
    ],
    description: [{ required: true, trigger: "change", message: "请输入描述" }],
    tag: [{ required: true, trigger: "change", message: "请输入标签" }],
    type: [{ required: true, trigger: "change", message: "请输入类型" }],
    brandId: [{ required: true, trigger: "change", message: "请选择品牌" }],
    firstPlateTime: [
      { required: true, trigger: "change", message: "请输入首次上牌时间" },
    ],
    transferNum: [
      { required: true, trigger: "change", message: "请输入过户次数" },
    ],
    energy: [{ required: true, trigger: "change", message: "请输入能源" }],
    mileage: [{ required: true, trigger: "change", message: "请输入里程" }],
    carAge: [
      { required: true, trigger: "change", message: "请输入车龄" },
      { type: "number", message: "请输入数字" },
    ],
    emissionStandard: [
      { required: true, trigger: "change", message: "请输入标准排量" },
    ],
    drivingMeans: [
      { required: true, trigger: "change", message: "请输入驱动" },
    ],
  });
  return rules;
};
