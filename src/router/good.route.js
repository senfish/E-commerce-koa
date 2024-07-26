const Router = require('@koa/router');
const {upload, create} = require('../controller/good.controller');
const { auth, hasAdminPermission } = require('../middleware/auth.middleware');
const {validator} = require('../middleware/goods.middleware');
const router = new Router({prefix: '/goods'})
// 上传文件
router.post('/upload', auth, hasAdminPermission, upload)
// 创建商品
router.post('/create', auth, hasAdminPermission, validator, create)
module.exports = router;