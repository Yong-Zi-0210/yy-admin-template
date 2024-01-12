import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

export function hotUnitList(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getHotCompanies",
    method: "post",
    data,
  });
}

// 新增
export function addHotUint(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/createHotCompany",
    method: "post",
    data,
  });
}

// 修改
export function editHotUnit(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/modifyHotCompany",
    method: "post",
    data,
  });
}
