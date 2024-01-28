import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 品牌列表
export function goodsBrandsList(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/getGoodsBrands",
    method: "post",
    data,
  });
}

// 全部品牌列表
export function goodsAllBrands() {
  return request<ApiResponseData<any>>({
    url: "goods/getAllGoodsBrands",
    method: "post",
  });
}

// 根据分类id获取关联品牌
export function getBrandsByCategoryId(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/getGoodsCategoryAllBrands",
    method: "post",
    data,
  });
}

// 新增品牌
export function goodsBrandsAdd(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/createGoodsBrand",
    method: "post",
    data,
  });
}

// 修改品牌信息
export function goodsBrandsEdit(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/modifyGoodsBrand",
    method: "post",
    data,
  });
}
