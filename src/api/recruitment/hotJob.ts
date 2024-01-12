import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 列表
export function getHotJOb(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getHotPositions",
    method: "post",
    data,
  });
}

// 新增
export function addHotJob(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/createHotPosition",
    method: "post",
    data,
  });
}

// 修改
export function editHotJob(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/modifyHotPosition",
    method: "post",
    data,
  });
}
