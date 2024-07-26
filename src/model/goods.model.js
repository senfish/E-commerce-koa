const {DataTypes} = require('sequelize');
const seq = require('../db/seq');

// 创建模型

const Goods = seq.define('zd_good', {
  // id是自增的，不需要写
  goods_name: {
    type: DataTypes.STRING, // varchar(255)
    allowNull: false, // 不允许为空
    unique: true, // 必须是一个唯一值?
    comment: '商品名称', // 注释
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片'
  }
}, {
  timestamps: true,
})
// Goods.sync({force: true}); // force强行同步数据库


module.exports = Goods;
