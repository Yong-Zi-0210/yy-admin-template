import { request } from '@/utils/request'
import { ApiResponseData } from '@/utils/request/types'
// 文件上传
export function upload(data: object) {
  return request({
    url: '/file/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除图片
export function remove(data: object) {
  return request<ApiResponseData<any>>({
    url: '/usedCar/removeImage',
    method: 'post',
    data
  })
}

// 图片分类
export function imageCategories() {
  return request<ApiResponseData<any>>({
    url: '/usedCar/getImageCategories',
    method: 'post'
  })
}

export function addCategory(data: object) {
  return request<ApiResponseData<any>>({
    url: '/usedCar/addImageCategory',
    method: 'post',
    data
  })
}

// 获取对应分类的图片数据
export function images(data: object) {
  return request<ApiResponseData<any>>({
    url: '/usedCar/getImages',
    method: 'post',
    data
  })
}
