const {createUser, getUserInfo, updateById} = require('../service/user.service');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default');

class UserController {
  async register(ctx, next){
    const {user_name, password} = ctx.request.body;
    // 1. 获取数据
    // 2. 操作数据库
    const res = await createUser(user_name, password);
    // 3. 返回值
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      data: {
        id: res.id,
        user_name: res.user_name,
      }
    }
  }
  async login(ctx, next){
    const {user_name} = ctx.request.body;

    try {
      const {password, ...res} = await getUserInfo({user_name});
      ctx.body = {
        code: '0',
        message: '用户登录成功',
        data: {
          token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'})
        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
  /** 修改密码 */ 
  async chanegPassword (ctx, next) {
    // 1. 获取数据， 
    // 前面已经解密了token，从token里面获取了id，user_name, 等信息
    const id = ctx.state.user.id;
    console.log('id: ', id);
    const password = ctx.request.body.password;
    console.log('加密后的新密码password: ', password);
    // 2. 操作数据库
    const res = await updateById({id, password});
    // 3. 返回
    if(res) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        data: null
      }
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码错误',
        data: null,
      }
    }
  }
}

module.exports = new UserController();