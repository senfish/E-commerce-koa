const { Sequelize } = require("sequelize");

const {
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_HOST,
} = require("../config/config.default");

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

// 测试数据库是否成功连接
// seq
//   .authenticate()
//   .then((res) => {
//     console.log("数据库连接成功");
//   })
//   .catch("数据库连接失败");

module.exports = seq;