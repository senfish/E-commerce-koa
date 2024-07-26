const path = require('path');

class GoodsController {

  async upload(ctx, next) {
    const {file} = ctx.request.files;
    console.log('file: ', file);
    if(file) {
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        data: {
          goods_img: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', uploadError, ctx);
    }
    // const {file} = ctx.request.body;
    // console.log('file: ', file);
    // ctx.body = '上传成功'
  }
}

module.exports = new GoodsController();