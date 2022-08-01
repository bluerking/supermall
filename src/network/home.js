// 导入request
import { request } from './request';

// 封装函数请求首页全部数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 封装函数请求商品
// 请求首页流行、新款、精选数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type ,
      page 
    }
  })
}