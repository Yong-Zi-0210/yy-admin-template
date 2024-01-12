import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    categoryId: [
      { required: true, trigger: "change", message: "请输入分类名称" },
    ],
    positionId: [
      { required: true, trigger: "change", message: "请输入职位名称" },
    ],
    salary: [{ required: true, trigger: "change", message: "请输入薪资" }],
    city: [{ required: true, trigger: "change", message: "请输入所在城市" }],
    workingAge: [{ required: true, trigger: "change", message: "请输入工龄" }],
    education: [{ required: true, trigger: "change", message: "请输入学历" }],
    keywords: [{ required: true, trigger: "change", message: "请输入关键字" }],
    companyName: [
      { required: true, trigger: "change", message: "请输入公司名称" },
    ],
    companyType: [
      { required: true, trigger: "change", message: "请输入公司类型" },
    ],
    financing: [
      { required: true, trigger: "change", message: "请输入融资类型" },
    ],
    weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
  });
  return rules;
};
