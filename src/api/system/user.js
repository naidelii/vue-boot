import { getAction } from '@/utils/action'

/**
 * 获取当前登录用户的信息
 * @returns 登录用户的信息
 */
export function getCurrentUser() {
  return getAction('/sys/user/getCurrentUser')
}

/**
 * 根据用户id获取用户信息
 * @param {*} id 用户id
 * @returns 用户信息
 */
export function getUserById(id) {
  return getAction('/sys/user/getUserById', id)
}

