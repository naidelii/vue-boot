import { getAction, postAction } from '@/utils/action'

export function getCaptcha(params) {
  return getAction('/auth/captcha', params)
}

export function login(data) {
  return postAction('/auth/login', data)
}

export function logout() {
  return getAction('/auth/logout')
}
