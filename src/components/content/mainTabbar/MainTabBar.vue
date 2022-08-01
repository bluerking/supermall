<template>
<div id="main-tab-bar">
    <tab-bar>
     <tab-bar-item path="/home" activeColor="deeppink">
          <img src="@/assets/img/tabbar/home.svg" alt="" slot="item-icon" />
          <img src="../../../assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active" />
          <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deeppink">
        <img src="../../../assets/img/tabbar/category.svg" alt="" slot="item-icon"/>
        <img src="../../../assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active"/>
        <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deeppink">
        <img src="../../../assets/img/tabbar/shopcart.svg" alt="" slot=item-icon />
        <img src="../../../assets/img/tabbar/shopcart_active.svg" alt="" slot=item-icon-active />
        <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deeppink">
        <img src="../../../assets/img/tabbar/profile.svg" alt="" slot=item-icon />
        <img src="../../../assets/img/tabbar/profile_active.svg" alt="" slot=item-icon-active />
        <span slot="item-text">我的</span>
      </tab-bar-item>
   </tab-bar>
   </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
    }
}
</script>

<style>
</style>