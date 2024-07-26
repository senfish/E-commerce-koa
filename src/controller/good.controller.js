const path = require('path');
const { noSupportFileTypeError, createGoodsError, updateGoodsError, invalidGoodsError } = require('../const/err.type');
const fs = require('fs');
const { createGoods, updateGoodsById } = require('../service/goods.service');

class GoodsController {
  
  async upload(ctx, next) {
    const {file = {}} = ctx.request.files; // 只能上传单个文件
    console.log('file: ', file);
    let fileTypes = ['.jpg', '.png', '.jpeg'];
    if(file) {
      // 过滤文件名
      const extname = path.extname(file.originalFilename)
      console.log('extname: ', extname);
      if(!fileTypes.includes(extname)) {
        return ctx.app.emit('error', noSupportFileTypeError, ctx);
      }
      // 手动写入到文件夹里面
      function writeFile(file) {
        return new Promise((resolve, reject) => {
          const root = path.join(__dirname, '../static');
          const filePath = path.join(root, file.newFilename);
          const readStream = fs.createReadStream(file.filepath);
          const writeStream = fs.createWriteStream(filePath);
          readStream.pipe(writeStream);
          writeStream.on('finish', () => {
            resolve();
          })
          writeStream.on('error', (err) => {
            reject(err);
          })
        })
      }
      try {
        await writeFile(file)
      } catch (err) {
        console.error('写入文件错误', err);
        return;
      }
      
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
  async create(ctx, next) {
    try {
      // 操作数据库
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: '创建成功',
        data: res
      }
    } catch(err) {
      console.error(err)
      return ctx.app.emit('error', createGoodsError, ctx)
    }
  }
  async update(ctx, next) {
    // 拿到url上的id，然后去数据库里面去找到对应的数据，然后更新数据库
    try {
      const res = await updateGoodsById({id: ctx.params.id, body: ctx.request.body})
      if(res) {
        ctx.body = {
          code: 0,
          message: '修改成功',
          data: res
        }
      } else { // id可能没找到的情况下
        return ctx.app.emit('error', invalidGoodsError , ctx)
      }
    } catch (err) {
      console.error('err: ', err);
      return ctx.app.emit('error', updateGoodsError, ctx);
    }
  }
}

module.exports = new GoodsController();