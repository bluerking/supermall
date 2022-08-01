<template>
  <div class="shop-info">
    <div class="shop-logo">
      <a href="shop.shopUrl">
        <img :src="shop.logo">
        <span class="shopname">{{ shop.name }}</span>
      </a>
    </div>
    <div class="shop-detail">
      <div class="shop">
        <div class="shopsells">
          <div>{{ shop.sells | sellCountFilter }}</div>  
          <div>总销量</div>
        </div>
        <div class="goodsCount">
          <div>{{ shop.goodsCount }}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-score">
        <span 
          v-for="(item, index) in shop.score" 
          :key="index"
        >
          <span class="itemname">{{ item.name }}</span>
          <span 
            class="font-green"
            :class="{'font-red': item.isBetter}"
          >
            {{ item.score }}
          </span>
          <span 
            class="background-green"
            :class="{'background-red': item.isBetter}">{{ item.isBetter ? '高' : '低' }}</span>
        </span>
      </div>
    </div>
    <div class="myStore">
      <a href="">
        <span>进店逛逛</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + '万'
  }
 }
};
</script>

<style scoped>
.shop-info {
  padding: 30px 10px;
}

.shop-logo {
  margin-bottom: 30px;
}
.shop-logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
.shopname {
  font-size: 20px;
}
.shop-detail {
  display: flex;
}
.shop-detail div {
  flex: 1;
}
.shop {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopsells,
.goodsCount {
  text-align: center;
}
.shopsells div:first-child, 
.goodsCount div:first-child {
  font-size: 20px;
  margin-bottom: 5px;
}
.shop span {
  flex: 1;
}

.shop-score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-left: 1px solid #ccc;
}
.itemname {
   padding-left: 30px;
   line-height: 1.5;
}
.font-green {
  color: #5ea732;
  margin-left: 15px;
}
.font-red {
  color: red;
}
.background-green {
  position: absolute;
  right: 15px;
  background-color: green;
  color: #fff;
  margin-right: 0;
}
.background-red {
  background-color: red;
  color: #fff;
}
.myStore {
  width: 149px;
  height: 30px;
  margin:  20px auto;
  background: rgba(204, 204, 204, .3);
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}
</style>