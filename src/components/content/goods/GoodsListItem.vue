<template>
  <div 
    v-if="Object.keys(goodsItem).length !== 0"
    @click="itemClick" 
    class="goods-item-list" 
  >
    <img 
      :src="showImage" 
      alt=""
      @load="imageLoad"
    >
    <div class="goods-info">
      <p class="title">
        {{ goodsItem.title }}
      </p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
    this.$bus.$emit('itemImgLoad')

      // 通过路由判断是否发送图片加载完的自定义事件
      // if (this.$route.path.indexof('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else if (this.$route.path.indexof('/detail') === -1) {
      //  this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      // 通过编程式传递参数，实现页面跳转
      // this.$router.push('/detail/' + this.goodsItem.iid)
      this.$router.push({
        name: 'Detail',
        params: {iid: this.goodsItem.iid}
      })
      }
  },
  computed: {
    showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
  }
;
</script>

<style scoped>
.goods-item-list {
  width: 48%;
  padding-bottom: 10px;
}
 .goods-item-list img {
 width: 100%;
 border-radius: 5px;
 }
 .goods-info {
  margin: 10px 10px 0;
 }
 .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-block: 3px;
 }
 .price {
  margin-right: 20px; 
  color: hotpink;
 }
 .collect::before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url('~@/assets/img/common/collect.svg') 0 0/15px 15px;
 }
</style>