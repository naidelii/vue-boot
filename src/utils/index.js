// 错误响应码
export const ErrorEnum = {
  UNAUTHORIZED: {
    code: 401
  },
  FORBIDDEN: {
    code: 403
  },
  SERVICE_UNAVAILABLE: {
    code: 503
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

/**
 * 将列表数据转换为树形结构
 * @param {Array} list - 需要转换的列表数据
 * @param {String} [idKey='id'] - 唯一标识键名，默认为 'id'
 * @param {String} [parentKey='parentId'] - 父节点标识键名，默认为 'parentId'
 * @param {String} [childrenKey='children'] - 子节点数组键名，默认为 'children'
 * @param {Function} [mapFn] - 可选的映射函数，用于处理节点数据
 * @returns {Array} - 转换后的树形结构数据
 */
export function listToTree(list, idKey = 'id', parentKey = 'parentId', childrenKey = 'children', mapFn) {
  // 创建一个映射表，用于快速查找节点
  const map = {}
  // 存放最终树形结构的数组
  const tree = []

  // 第一次遍历：将列表中的每个元素存入映射表中，并初始化它们的子节点数组
  list.forEach(item => {
    // 如果传入了 mapFn，则使用 mapFn 处理节点数据，否则直接使用原始数据
    map[item[idKey]] = mapFn ? { ...mapFn(item), [childrenKey]: [] } : { ...item, [childrenKey]: [] }
  })

  // 第二次遍历：根据父节点标识，构建父子关系
  list.forEach(item => {
    const parent = map[item[parentKey]]
    if (parent) {
      parent[childrenKey].push(map[item[idKey]])
    } else {
      tree.push(map[item[idKey]])
    }
  })

  // 返回构建好的树形结构
  return tree
}

export function getPasswordValidationRules() {
  return [
    { required: true, message: '用户密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
    { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: 'blur' }
  ]
}
