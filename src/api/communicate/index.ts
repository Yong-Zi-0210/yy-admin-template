import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
import { CommunicationRequest } from "./types";

// 获取沟通列表
export function communication(data: CommunicationRequest) {
  return request<ApiResponseData<any>>({
    url: "usedCar/getCommunicates",
    method: "post",
    data,
  });
}
