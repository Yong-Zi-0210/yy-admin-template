import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 列表
export function hotJobCategoty(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getHotPositionCategories",
    method: "post",
    data,
  });
}

// 新增
export function addHotJobCategoty(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/createHotPositionCategory",
    method: "post",
    data,
  });
}

// 修改
export function editHotJobCategoty(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/modifyHotPositionCategory",
    method: "post",
    data,
  });
}
