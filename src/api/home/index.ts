import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

export function statistics() {
  return request<ApiResponseData<any>>({
    url: "/dashboard/statistics",
    method: "post",
  });
}
