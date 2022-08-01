import { request } from './request'

// 获取详情页数据
export function getDetial(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  
   })
}

// 获取详情页推荐商品数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

//定义一个类函数，分离商品数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desC = itemInfo.desC
    this.newPrice = itemInfo.Price
    this.oldPrice = itemInfo.oldPrice
    // this.discount = itemInfo.discount
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 定义类函数,分离商铺数据

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 定义一个类函数，分离具体的某一个商品的数据
export class DetailInfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc;
    this.key = detailInfo.detailImage[0].key
    this.list = detailInfo.detailImage[0].list
  }
}

export class ItemParams {
  constructor(info, rule) {
    this.image = info.image ? info.image[0] : ''
    this.set = info.set
    this.tables = rule.tables
  }
}



