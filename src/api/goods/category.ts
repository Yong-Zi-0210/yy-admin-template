import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";

// 所以商品分类
export function goodsAllCategoryList() {
  return request<ApiResponseData<any>>({
    url: "goods/getAllManageGoodsCategories",
    method: "post",
  });
}

// 商品分类修改
export function goodsCategoryEdit(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/modifyGoodsCategory",
    method: "post",
    data,
  });
}

// 商品分类新增
export function goodsCategoryAdd(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/createGoodsCategory",
    method: "post",
    data,
  });
}

// 新建关联关系
export function addCategoryAndBrand(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/createGoodsCategoryBrands",
    method: "post",
    data,
  });
}

// 修改关联关系
export function editCategoryAndBrand(data: object) {
  return request<ApiResponseData<any>>({
    url: "goods/modifyGoodsCategoryBrands",
    method: "post",
    data,
  });
}
