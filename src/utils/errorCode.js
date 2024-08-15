export const ErrorEnum = {
  UNAUTHORIZED: {
    code: 401,
    message: '登录已过期，请重新登录' },
  FORBIDDEN: {
    code: 403,
    message: '没有权限' },
  DEFAULT: {
    message: '服务器开小差，请稍后再试' }
}
