import { getAction } from '@/utils/action'

export function getUserMenuList() {
  return getAction('/sys/permission/nav')
}

export function getMenuTree() {
  return getAction('/sys/permission/tree')
}
