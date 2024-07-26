const {DataTypes} = require('sequelize');
const seq = require('../db/seq');

// 创建模型

const User = seq.define('zd_user', {
  // id是自增的，不需要写
  user_name: {
    type: DataTypes.STRING, // varchar(255)
    allowNull: false, // 不允许为空
    unique: true, // 必须是一个唯一值
    comment: '用户名，唯一', // 注释
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，0不是管理员（默认），1是管理员'
  }
}, {
  // timestamps: false,
})

// User.sync({force: true}); // force强行同步数据库

module.exports = User;
