import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 订单列表
export function goodsOrderList(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/getManageGoodsOrders",
    method: "post",
    data,
  });
}

// 订单发货
export function sendGoods(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/sendGoods",
    method: "post",
    data,
  });
}
