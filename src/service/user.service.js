const User = require('../model/user.model');

class UserService{
  async createUser(user_name, password) {
    console.log('password: ', password);
    console.log('user_name: ', user_name);
    const res = await User.create({user_name, password});
    console.log('res: ', res);
    return res.dataValues
  }
  async getUserInfo({id, user_name, password, is_admin}) {
    const whereOpt = {};
    id && Object.assign(whereOpt, {id});
    user_name && Object.assign(whereOpt, {user_name})
    password && Object.assign(whereOpt, {password})
    is_admin && Object.assign(whereOpt, {is_admin})

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    });
    return res ? res.dataValues : null;
  }
  /** 通过id更新用户表信息，返回一个boolean */
  async updateById({id, user_name, password, is_admin}) {
    const whereOpt = {id}
    const newUser = {}
    user_name && Object.assign(newUser, {user_name})
    password && Object.assign(newUser, {password})
    is_admin && Object.assign(newUser, {is_admin})
    // 根据id查找数据，然后用newUser替换老数据
    const res = await User.update(newUser, {
      where: whereOpt
    });
    console.log('res: ', res);
    // res 如果操作成功的话返回[1], 失败的话[0]
    return res[0] > 0
  }
}

module.exports = new UserService();