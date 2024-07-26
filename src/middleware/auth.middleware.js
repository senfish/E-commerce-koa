const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, jsonWebTokenError, hasNotAdminPermission, tokenEmptyError } = require("../const/err.type");

/** 校验token权限 */
const auth = async (ctx, next) => {
  let { token } = ctx.request.header;
  if(!token) return ctx.app.emit('error', tokenEmptyError, ctx);
  token = token.replace("Bearer ", "");
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    console.log("err: ", err.name);
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已经过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效token", err);
        return ctx.app.emit("error", jsonWebTokenError, ctx);
    }
  }
  await next();
};
/** 是否有管理员权限 必须放到auth中间件后面*/
const hasAdminPermission = async (ctx, next) => {
  const {is_admin} = ctx.state.user;
  if(!is_admin) {
    console.error('该用户没有管理员权限', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx);
  }
  await next();
}
module.exports = {
  auth,
  hasAdminPermission,

};
