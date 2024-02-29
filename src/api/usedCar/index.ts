import { request } from "@/utils/request";
import { ApiResponseData } from "@/utils/request/types";
import { usedCarRequest } from "./types";

// 二手车列表
export function usedCarList(data: usedCarRequest) {
  return request<ApiResponseData<any>>({
    url: "usedCar/getUsedCars",
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
  return request<ApiResponseData<any>>({
    url: "/usedCar/onOffShelfUsedCar",
    method: "post",
    data,
  });
}

// 卖车列表
export function saleCars(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/getSaleCars",
    method: "post",
    data,
  });
}

// 分配经销商
export function saleCarSelectDealer(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/saleCarSelectDealer",
    method: "post",
    data,
  });
}

// 经销商列表
export function dealerList(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/getDealers",
    method: "post",
    data,
  });
}

// 经销商新增
export function addDealer(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/createDealer",
    method: "post",
    data,
  });
}

// 修改经销商
export function editDealer(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/modifyDealer",
    method: "post",
    data,
  });
}

// 经销商冻结
export function freezeDealer(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/freezeDealer",
    method: "post",
    data,
  });
}

// 经销商解冻
export function unfreezeDealer(data: object) {
  return request<ApiResponseData<any>>({
    url: "/usedCar/unfreezeDealer",
    method: "post",
    data,
  });
}
