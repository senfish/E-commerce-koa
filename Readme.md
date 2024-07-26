
### 1. 监听文件改变 nodemon
package.json文件
```
 "scripts": {
    "dev": "nodemon src/index",
    "start": "nodemon src/index",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
### 2. 加载环境变量 dotenv

### 3. 添加路由 

```
npm i @koa/router
```
### 4.解析body
```
npm i koa-body
```

### 5.sequelize连接数据库

### 6. jwt加密 

**加密**
1. 登录的时候，将除了password的字段，用私钥加密其他的字段，生成一个有实效期的token

**解密**
1. 从header里面拿到token，然后利用jwt解密


## 用户模块
1. 注册用户
2. 修改密码
3. 登录
4. 用户列表（todo）
## 商品模块
1. 上传商品