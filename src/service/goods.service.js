const Goods = require('../model/goods.model');

class GoodsService {
  async createGoods({goods_name, goods_img, goods_num, goods_price}) {
    const res = await Goods.create({goods_name, goods_img, goods_num, goods_price})
    console.log('res ======>: ', res);
    return res.dataValues;
  }
}


module.exports = new GoodsService();