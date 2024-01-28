import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 商品列表
export function goodsList(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/getGoods",
    method: "post",
    data,
  });
}

// 商品详情
export function goodsDetail(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/getGoodsDetail",
    method: "post",
    data,
  });
}

// 商品新增
export function goodsAdd(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/createGoods",
    method: "post",
    data,
  });
}

// 商品修改
export function goodsEdit(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/modifyGoods",
    method: "post",
    data,
  });
}
