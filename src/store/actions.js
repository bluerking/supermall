export default {
  addToCart(context, payLoad) {
    let oldProduct = null
    for (let item of context.state.cartList) {
      if (item.iid === payLoad.iid) {
        oldProduct = item
      }
    }
    // 2、判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1   需要跟踪count状态的改变，所以发送到mutations里面
      context.commit('addCounter', oldProduct)
    } else {
      payLoad.count = 1
      // state.cartList.push(payLoad)   需要跟踪cartList状态的改变，所以发送到mutations里面
      context.commit('addToCart', payLoad)
    }
  },
  cancleChecked(context, payLoad) {
    let oldProduct = null
    for (let [index, item] of context.state.cartList.entries()) {
      if (item.iid === payLoad.iid) {
        oldProduct = item
        context.commit({ type: 'cancleChecked', oldProduct, index })
      }
    
    }
  }
}