const fs = require('fs');
const Router = require('@koa/router');

const router = new Router();

fs.readdirSync(__dirname).forEach(file => {
  if(file !== 'index.js') {
    let path = './' + file;
    let r = require(path);
    router.use(r.routes());
  }
});

module.exports = router;