import { getAction } from '@/utils/action'

export function getInfoById(id) {
  return getAction('/product/brand/info', id)
}
