import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    companyName: [
      { required: true, trigger: "change", message: "请输入公司名称" },
    ],
    companyType: [
      { required: true, trigger: "change", message: "请输入公司类型" },
    ],
    financing: [
      { required: true, trigger: "change", message: "请输入融资类型" },
    ],
    employeeNum: [
      { required: true, trigger: "change", message: "请输入员工数" },
    ],
    weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
  });
  return rules;
};
