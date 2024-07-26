

module.exports = {
  userFormatError: {
    code: "10001",
    message: "user_name or password is not exist",
    data: null,
  },
  userAlreadyExisted: {
    code: '10002',
    message: 'user_name is already exist',
    data: null
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    data: null
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    data: null
  },
  invalidPassword: {
    code: '10006',
    message: '密码不匹配',
    data: null
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    data: null,
  },
  jsonWebTokenError: {
    code: '10102',
    message: 'token无效',
    data: null,
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    data: null,
  },
  uploadError: {
    code: '10104',
    message: '上传图片失败',
    data: null,
  },
  noSupportFileTypeError: {
    code: '10105',
    message: '文件格式错误，只支持png、jpg、jpeg格式的图片',
    data: null,
  },
  goodsFormatError: {
    code: '10301',
    message: '参数丢失',
    data: null,
  },
  createGoodsError: {
    code: '10302',
    message: '创建商品失败',
    data: null,
  }
}