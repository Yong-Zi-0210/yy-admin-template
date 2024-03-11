import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 推荐位列表
export function recommendList(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recommend/getRecommends",
    method: "post",
    data,
  });
}

// 新增推荐位
export function createRecommends(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recommend/createRecommends",
    method: "post",
    data,
  });
}

// 修改推荐位
export function modifyRecommends(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recommend/modifyRecommends",
    method: "post",
    data,
  });
}
