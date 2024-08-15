import { getAction } from '@/api/manager'

export function getInfo() {
  return getAction('/sys/user/info')
}
