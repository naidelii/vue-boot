import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { ErrorEnum } from '@/utils/index'

// 创建 axios 实例
const service = axios.create({
  // 请求的基础 URL = 基础 URL + 请求的 URL
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  request => {
    // 在请求发送之前做一些处理
    request.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 获取token
    const token = getToken()
    if (token) {
      // 让每个请求携带 token
      request.headers['Authorization'] = token
    }
    return request
  },
  // 请求拦截器异常处理
  e => {
    console.log('service.interceptors.request：', e)
    return Promise.reject(e)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 数据
    const resp = response.data
    // 响应状态码
    const respCode = resp.code
    // 如果是正常的直接响应
    if (respCode === 200) {
      return resp
    }
    // 处理错误情况
    const errorMsg = resp.msg || ErrorEnum.DEFAULT.message
    // 如果是登录失效
    if (respCode === ErrorEnum.UNAUTHORIZED.code) {
      // 显示提示信息
      Message({
        message: errorMsg,
        type: 'error',
        // 3秒后关闭提示
        duration: 3 * 1000,
        onClose: async() => {
          // 注销用户
          await store.dispatch('user/logout')
        }
      })
    } else {
      // 打印异常信息
      Message({
        message: errorMsg,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(new Error(errorMsg))
  },
  // 响应拦截器异常处理（HTTP状态码非200）
  error => {
    Message({
      message: ErrorEnum.DEFAULT.message,
      type: 'error',
      duration: 3 * 1000
    })
    // 抛出一个自定义错误来终止后续处理
    return Promise.reject(error)
  }
)

export default service
