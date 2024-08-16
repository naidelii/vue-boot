import { getAction } from '@/utils/action'

export function getRoleList() {
  return getAction('/sys/role/list')
}
