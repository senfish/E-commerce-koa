const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, jsonWebTokenError } = require("../const/err.type");

const auth = async (ctx, next) => {
  let { token } = ctx.request.header;
  token = token.replace("Bearer ", "");
  console.log("newToken: ", token);
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

module.exports = {
  auth,
};
