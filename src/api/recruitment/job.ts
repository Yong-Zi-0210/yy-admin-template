import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
// 职位列表
export function jobList(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getCompanyPositions",
    method: "post",
    data,
  });
}

// 职位详情数据
export function jobDetail(data: object) {
  {
    return request<ApiResponseData<any>>({
      url: "recruitment/getCompanyPositionDetail",
      method: "post",
      data,
    });
  }
}

// 职位新增
export function addJob(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/createPosition",
    method: "post",
    data,
  });
}

// 职位修改
export function editJob(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/modifyPosition",
    method: "post",
    data,
  });
}
