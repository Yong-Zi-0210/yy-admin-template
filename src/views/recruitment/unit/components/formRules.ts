import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    name: [{ required: true, trigger: "change", message: "请输入公司名称" }],
    type: [{ required: true, trigger: "change", message: "请输入公司类型" }],
    financing: [
      { required: true, trigger: "change", message: "请输入融资类型" },
    ],
    displayImage: [
      { required: true, trigger: "change", message: "请上传显示图片" },
    ],
    images: [{ required: true, trigger: "change", message: "请上传图集" }],
    employeeNum: [
      { required: true, trigger: "change", message: "请输入员工数" },
    ],
    tag: [{ required: true, trigger: "change", message: "请输入标签" }],
    workTime: [
      { required: true, trigger: "change", message: "请输入工作时间" },
    ],
    address: [{ required: true, trigger: "change", message: "请输入地址" }],
    welfareTreatment: [
      { required: true, trigger: "change", message: "请输入福利待遇" },
    ],
    profile: [{ required: true, trigger: "change", message: "请输入公司简介" }],
    companyDetails: [
      { required: true, trigger: "change", message: "请输入公司详情" },
    ],
    industryInformation: [
      { required: true, trigger: "change", message: "请输入行业信息" },
    ],
  });
  return rules;
};
