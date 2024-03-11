import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 职位投递列表
export function resumesList(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recruitment/getSubmitResumes",
    method: "post",
    data,
  });
}

// 查看简历
export function resumeDetail(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recruitment/getResume",
    method: "post",
    data,
  });
}

// 投递简历
export function submitResume(data: object) {
  return request<ApiResponseData<any>>({
    url: "/recruitment/submitResume",
    method: "post",
    data,
  });
}
