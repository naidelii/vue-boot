import { getAction } from '@/utils/action'

export function getRoleList() {
  return getAction('/sys/role/list')
}

export function getRoleById(id) {
  return getAction('/sys/role/getRoleById', id)
}

