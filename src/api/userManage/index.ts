import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 用户列表查询
export function userList(data: object) {
  return request<ApiResponseData<any>>({
    url: "/user/getUsers",
    method: "post",
    data,
  });
}

//
