//导入下载的axios包
import axios from 'axios'

// 封装函数
export function request(config) {
  
    // 1、创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })

    //2、axios的拦截器
    // 2.1 请求拦截的作用
    /*
    1、config中的一些信息不符合服务器的要求，拦截下来
    2、每次发送网络请求时，希望在页面中显示一个请求的图标
    3、某些网络请求，必须携带一些特殊的信息
     */
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      return err
    })

    //2.2 响应拦截
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      return err
    })

    //3.发送真正的网络请求
    return instance(config)

}