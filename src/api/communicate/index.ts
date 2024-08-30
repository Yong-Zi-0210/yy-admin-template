import { request } from '@/utils/request'
import { ApiResponseData } from '@/utils/request/types'
import { CommunicationRequest } from './types'

// 获取沟通列表
export function communication(data: CommunicationRequest) {
  return request<ApiResponseData<any>>({
    url: 'communicate/getCommunicates',
    method: 'post',
    data
  })
}

// 修改沟通状态
export function update(data: object) {
  return request<ApiResponseData<any>>({
    url: '/communicate/confirmCommunicate',
    method: 'post',
    data
  })
}
