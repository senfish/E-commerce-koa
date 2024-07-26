const bcryptjs = require('bcryptjs')
const {getUserInfo} = require('../service/user.service');
const {userAlreadyExisted, userFormatError, userDoesNotExist, userLoginError, invalidPassword} = require('../const/err.type');

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 检查参数是否为空
  if (!user_name || !password) {
    console.error("不存在", ctx.request.body);
    ctx.app.emit('error', userFormatError, ctx)
    return;
  }
  await next();
};
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  if(await getUserInfo({user_name})) {
    ctx.app.emit('error', userAlreadyExisted, ctx)
    return
  }
  await next();
}
/** 密码加密 */
const cryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body;
  let salt = bcryptjs.genSaltSync(10);
  let hash = bcryptjs.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
}

const verifyLogin = async(ctx, next) => {
  // 1. 判断用户是否存在
  // 2. 判断密码是否匹配
  const {user_name, password} = ctx.request.body;
  console.log('password: ', password);
  try {
    const res = await getUserInfo({user_name});
    console.log('res.password: ', res.password);
    // 用户不存在
    if(!res) {
      console.log('用户名不存在', user_name);
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    // 校验密码是否一致
    if(!bcryptjs.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch(err) {
    console.log( err);
    ctx.app.emit('error', userLoginError, ctx);
    return;
  }
 
  await next();
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
}
