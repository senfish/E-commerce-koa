const Router = require('@koa/router');
const {register, login, chanegPassword} = require('../controller/user.controller');
const {userValidator, verifyUser, cryptPassword, verifyLogin} = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({prefix: '/users'})

router.post('/register', userValidator, verifyUser,cryptPassword, register); // 中间件参数拦截校验
router.post('/login', userValidator, verifyLogin, login)
// todo 没有实现新老密码不能一致
router.patch('/modify', auth, cryptPassword, chanegPassword);

module.exports = router;