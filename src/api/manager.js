import request from '@/utils/request'

export function getAction(url, params) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}
export function postAction(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
