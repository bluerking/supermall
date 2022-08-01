module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.css'], //内部已经配置过了
      // alias: {
      //   //    // 内部默认已经设置的别名 'src' : '@
      //   //   'assets': '@/assets',
      //   //   'common': '@/common',
      //   // 'components':'@/components',
      //   //   'network': '@/network',
      //   //   'views': '@/views'
      // }
    }
  },
  // devServer: {  //解决换行检查
  //   overlay: {
  //       warnings: false,
  //       errors: false
  //   },
    
}
// }