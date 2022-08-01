<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll 
      ref="scroll"
      class="content"
    >
      <cart-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childrenComps/CartList";
import CartBottomBar from './childrenComps/CartBottomBar'
import Scroll from "@/components/common/scroll/Scroll";

// 将getters映射到组件的计算属性computed里面

// 1、从vuex里面导入mapGetters
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },

  //2、在computed里面使用扩展运算符将mapGetters 里面的getter一个个取出来
  computed: {
    // 方法一：数组的形式
    // 在...mapGetters()里面放一个数组，写明要对哪些getter转成计算属性
    // ...mapGetters([
    //   'goodsCount'
    // ])

    // 方法二：对象的形式
    // ...mapGetters()里面放一个对象，定义一个属性，指向gettters里面对应的方法
    ...mapGetters({
      length: "goodsCount",
    }),
  },
  activated() {
    this.$refs.scroll.refresh()
  }

};
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
  overflow: hidden;
}
.nav-bar {
  color: #fff;
  background: rgba(255, 105, 180, 0.9);
}
</style>