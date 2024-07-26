const Koa = require('koa');
const {koaBody} = require('koa-body');
const errorHandle = require('./errorHandle');
// const userRouter = require('../router/user.route');
// const goodsRouter = require('../router/good.route');
const router = require('../router');
const app = new Koa();

app.use(koaBody());

// 注册路由
app
  .use(router.routes());

app.on('error', errorHandle)

module.exports = app;