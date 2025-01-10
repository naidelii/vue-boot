import { getAction } from '@/utils/action'

export function getUserMenuList() {
  return getAction('/sys/permission/nav')
}

export function getPermissionListToTree() {
  return getAction('/sys/permission/getPermissionListToTree')
}

export function getMenuListToTree() {
  return getAction('/sys/permission/getMenuListToTree')
}

export function getPermissionById(id) {
  return getAction('/sys/permission/getPermissionById', id)
}
