import { getAction } from '@/api/manager'

export function getMenuList() {
  return getAction('/sys/permission/nav')
}
