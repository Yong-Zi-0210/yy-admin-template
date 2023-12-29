import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
import { usedCarRequest } from "./types";
export function usedCarList(data: usedCarRequest) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/getUsedCars",
    method: "post",
    data,
  });
}

// 品牌列表
export function brands(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/getCarBrands",
    method: "post",
    data,
  });
}

// 新增二手车
export function addCar(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/createUsedCar",
    method: "post",
    data,
  });
}

// 修改
export function editCar(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/modifyUsedCar",
    method: "post",
    data,
  });
}

// 获取详情
export function detail(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/getUsedCarDetail",
    method: "post",
    data,
  });
}

// 二手车上下架
export function updateStatus(data: object) {
  return request({
    url: "/usedCar/onOffShelfUsedCar",
    method: "post",
    data,
  });
}
