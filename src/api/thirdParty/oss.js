import { getAction } from '@/utils/action'

/**
 * 获取凭证
 */
export function getPolicy(params) {
  return getAction('/thirdParty/oss/getPolicy', params)
}
