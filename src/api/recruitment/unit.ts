import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
// 单位列表（分页）
export function unitList(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getCompanies",
    method: "post",
    data,
  });
}

// 获取所有公司列表
export function allUnitList() {
  return request<ApiResponseData<any>>({
    url: "recruitment/getAllCompanies",
    method: "post",
  });
}

// 单位详情
export function detail(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recruitment/getCompanyDetail",
    method: "post",
    data,
  });
}

// 单位编辑
export function editUnit(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/modifyCompany",
    method: "post",
    data,
  });
}

// 单位新增
export function addUnit(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/createCompany",
    method: "post",
    data,
  });
}
