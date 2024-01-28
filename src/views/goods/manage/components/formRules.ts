import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    categoryId: [{ required: true, trigger: "change", message: "请选择分类" }],
    brandId: [{ required: true, trigger: "change", message: "请选择品牌" }],
    price: [{ required: true, trigger: "change", message: "请输入价格" }],
    displayImage: [
      { required: true, trigger: "change", message: "请上传显示图片" },
    ],
    images: [{ required: true, trigger: "change", message: "请上传图集" }],
    description: [{ required: true, trigger: "change", message: "请输入描述" }],
    goodsName: [
      { required: true, trigger: "change", message: "请输入商品名称" },
    ],
    goodsTitle: [{ required: true, trigger: "change", message: "请输入标题" }],
    points: [{ required: true, trigger: "change", message: "请选积分" }],
    status: [{ required: true, trigger: "change", message: "请选择状态" }],
    weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
    specType: [{ required: true, trigger: "change", message: "请选择规格" }],
    specs: [{ required: true, trigger: "change", message: "请填写规格" }],
    goodsSkus: [
      { required: true, trigger: "change", message: "请填写商品参数" },
    ],
  });
  return rules;
};
