export default {
  // mutations中的每个方法尽可能完成单一的事情，所以放到actions，只有在需要对数据进行改变的地方将数据发送回来
  addCounter(state, payLoad) {
    payLoad.count++
  },
  addToCart(state, payLoad) {
    payLoad.checked = true
   state.cartList.push(payLoad)
  },
  cancleChecked(state, payLoad) {
    state.cartList[payLoad.index].checked = !state.cartList[payLoad.index].checked
  }
}