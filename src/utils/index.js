// 错误响应码
export const ErrorEnum = {
  UNAUTHORIZED: {
    code: 401,
    message: '登录已过期，请重新登录'
  },
  FORBIDDEN: {
    code: 403,
    message: '没有权限'
  },
  DEFAULT: {
    message: '服务器开小差，请稍后再试'
  }
}

/**
 * 判断路径是否为外部链接
 * @param {string} path - 要检查的路径
 * @returns {Boolean} - 如果路径是外部链接，则返回 true，否则返回 false
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

