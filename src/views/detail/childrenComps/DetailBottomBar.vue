<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <i class="icon servicer"></i>
      <span>客服</span>
    </div>
    <div class="bar-left">
      <i class="icon store"></i>
      <span>店铺</span>
    </div>
    <div class="bar-left">
      <i class="icon collect"></i>
      <span>收藏</span>
    </div>
    <span 
      class="cart"
       @click="addToCart"
    >加入购物车
    </span>
    <span class="buy">购买</span>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
    this.$emit('addToCart')
    }
  },
  data() {
    return {
      counter: 0
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 1px 5px 1px rgba(204, 204, 204, 0.3);
}
.bar-left {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
  background: url("~@/assets/img/detail/detail_bottom.png") 0 0/ 25px 170px;
}
.bar-left .store {
  background-position: 0 -112px;
}
.bar-left .servicer {
  background-position: 0 -60px;
}
.cart,
.buy {
  width: 100px;
  text-align: center;
  line-height: 49px;
}

.cart {
  color: black;
  background-color: #ffb800;
}
.buy {
  color: #fff;
  background-color: #ff3366;
}
</style>