const Goods = require('../model/goods.model');

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues;
  }
  async updateGoodsById({id,  body}) {
    const {goods_name, goods_price, goods_num, goods_img} = body;
    const whereOpt = {id}
    const newGoods = {}
    goods_name && Object.assign(newGoods, {goods_name})
    goods_price && Object.assign(newGoods, {goods_price})
    goods_num && Object.assign(newGoods, {goods_num})
    goods_img && Object.assign(newGoods, {goods_img})

    // 根据id查找数据，然后用newGoods替换老数据
    const res = await Goods.update(newGoods, {
      where: whereOpt
    });
    // res 如果操作成功的话返回[1], 失败的话[0]
    return res[0] > 0
  }
}


module.exports = new GoodsService();