import { getAction } from '@/utils/action'

export function getMenuList() {
  return getAction('/sys/permission/nav')
}
