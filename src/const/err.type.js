

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
  }
}