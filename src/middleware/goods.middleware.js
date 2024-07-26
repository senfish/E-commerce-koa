const { goodsFormatError } = require("../const/err.type");


/** 发布商品dto参数校验 */
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {type: 'string', required: true},
      goods_price: {type: 'number', required: true},
      goods_num: {type: 'number', required: true},
      goods_img: {type: 'string', required: true},
    })
  } catch (err) {
    console.log('err: ', err);
    goodsFormatError.data = err.errors;
    return ctx.app.emit('error', goodsFormatError, ctx)
  }
  await next();
}
module.exports = {
  validator,
};
