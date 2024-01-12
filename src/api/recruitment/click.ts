import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
// 点击列表查询
export function clickList(data: object) {
  return request<ApiResponseData<any>>({
    url: "recruitment/getRecruitmentClicks",
    method: "post",
    data,
  });
}
