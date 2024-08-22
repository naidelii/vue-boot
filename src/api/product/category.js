import { getAction } from '@/utils/action'

export function getInfoById(id) {
  return getAction('/product/category/info', id)
}

export function getCategoryListToTree() {
  return getAction('/product/category/listWithTree')
}
