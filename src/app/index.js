const Koa = require('koa');
const path = require('path');
const {koaBody} = require('koa-body');
const koaStatic = require('koa-static');
const errorHandle = require('./errorHandle');
// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/good.route');
const router = require('../router');
const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true,
    multiples: false,
  }
}));
app.use(koaStatic(path.join(__dirname, '../upload')))
// 注册路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', errorHandle)

module.exports = app;