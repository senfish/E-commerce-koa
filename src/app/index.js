const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const {koaBody} = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errorHandle = require('./errorHandle');
const router = require('../router');
const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    // uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true,
    multiples: false,
  }
}));
app.use(KoaStatic(path.join(__dirname, '../upload')))

app.use(parameter(app));// 会往ctx对象里面挂在一个verifyParams方法
// 注册路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', errorHandle)

module.exports = app;