import { FormRules } from "element-plus";
export default () => {
  const rules = reactive<FormRules>({
    companyName: [
      { required: true, trigger: "change", message: "请输入公司名称" },
    ],
    companyType: [
      { required: true, trigger: "change", message: "请输入公司类型" },
    ],
    city: [{ required: true, trigger: "change", message: "请输入所在城市" }],
    keywords: [{ required: true, trigger: "change", message: "请输入关键字" }],
    name: [{ required: true, trigger: "change", message: "请输入岗位名称" }],
    address: [{ required: true, trigger: "change", message: "请输入地址" }],
    workingAge: [{ required: true, trigger: "change", message: "请输入工龄" }],
    education: [{ required: true, trigger: "change", message: "请输入学历" }],
    url: [{ required: true, trigger: "change", message: "请输入跳转链接" }],
    weight: [{ required: true, trigger: "change", message: "请输入优先级" }],
    workDetails: [
      { required: true, trigger: "change", message: "请输入工作详情" },
    ],
    salary: [{ required: true, trigger: "change", message: "请输入薪资" }],
  });
  return rules;
};
