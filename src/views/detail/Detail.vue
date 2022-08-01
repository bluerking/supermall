<template>
  <div class="detail">
    <detail-nav-bar 
      ref="navbar"
      :titles="['商品', '参数', '评价', '推荐']"
      @itemClick="itemClick(index)"
     />
    <scroll 
      ref="scroll"
      :probe-type="3"
      @scroll="showBackTop"
      class="detail-swiper" 
    >
      <detail-swiper 
        :top-images="topImages" 
      />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info 
        :detail-info="detailInfo"
      />
      <detail-item-params 
        :item-params="itemParams"
        ref="params"
      />
      <detail-comment-info 
        :comment-info="commentInfo" 
        ref="comments"
      />
      <goods-list 
        :goods="reCommends"
        ref="reCommends"
      />
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'/>
    <back-top v-show="isShowBackTop" @click.native="backTopClick" />
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childrenComps/DetailNavBar";
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";
import DetailGoodsInfo from './childrenComps/DetailGoodsInfo';
import DetailItemParams from './childrenComps/DetailItemParams';
import DetailCommentInfo from './childrenComps/DetailCommentInfo';
import GoodsList from '@/components/content/goods/GoodsList';
import DetailBottomBar from './childrenComps/DetailBottomBar'
// import BackTop from "@/components/content/backtop/BackTop";

import { debounce } from "@/common/utils";

import Scroll from "@/components/common/scroll/Scroll";

import { getDetial, Goods, Shop, DetailInfo, ItemParams, getRecommend } from "@/network/detail";

import { itemListenerMixin, backTopMixin } from '@/common/mixin'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailItemParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      reCommends: [],
      // itemImgListener: null, 重复代码  放到混入对象里面
      offsetTopy: [],
      getOffsetTopy: null,
      currentIndex: 0,
      // isShowBackTop: false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    showBackTop(position) {
      const positionY = -position.y
     // 1、隐藏返回顶部按钮
     this.listenerShowBackTop(position)
      // this.isShowBackTop = positionY > 1000   
    // 2、比较滚动的位置和选项卡对应组件的offsetTop
      // 点击选项卡，滚动到相应的内容页

    // 方法3：push一个最大值，和最后一个数组元素比较
      for (let i = 0, len = this.offsetTopy.length; i < len; i++) {
        if (i < len - 1 && positionY >= this.offsetTopy[i] && positionY < this.offsetTopy[i + 1]) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      }

    //  方法2：最后一个数组元素没有办法比较，增加判断条件
    //   for (let i = 0, len = this.offsetTopy.length; i < len; i++) {
    //     if (this.currentIndex !== i && ((i < len - 1 && positionY >= this.offsetTopy[i] && positionY < this.offsetTopy[i + 1]) || ( i === len - 1 && positionY >= this.offsetTopy[i]) )) {
    //       this.currentIndex = i
    //       this.$refs.navbar.currentIndex = this.currentIndex
    //       } 
    // }
      // 方法1：if  else if   else
      // if条件语句，也可以实现点击选项卡，滚动到相应的内容，但是比较繁琐
    //   if (positionY < this.offsetTopy[1]) {
    //   this.$refs.navbar.currentIndex = 0
    //   } else if (positionY < this.offsetTopy[2]) {
    //   this.$refs.navbar.currentIndex = 1
    //   } else if (positionY < this.offsetTopy[3]) {
    //   this.$refs.navbar.currentIndex = 2
    //   } else {
    //   this.$refs.navbar.currentIndex = 3
    // }

    },
    // backTopClick() { 
    // this.$refs.scroll.scrollTo(0, 0, 800)
    // },
    itemClick(index) {
       this.$refs.scroll.scrollTo(0, -this.offsetTopy[index], 200)
    },
    addToCart() {
      console.log('点击添加到购物车')
      // 1、获取购车需要展示的商品信息
      const product = {}
      product.title = this.goods.title
      product.desc = this.detailInfo.desc
      product.price = this.goods.realPrice
      product.imag = this.topImages[0]
      product.iid = this.iid

      // 2、将商品添加到购物车  采用vuex状态管理 多个组件共享状态
    //  this.$store.commit('addToCart', product)  通过mutations更改状态使用commit发送数据
    // 通过actions更改状态：使用dispatch分发送数据
    this.$store.dispatch('addToCart', product)

    }
  },
  // 因为设置了keep-alive所以，会缓存页面数据，不会重复的去创建页面，所以获取到的还是之前的iid
  // 所以需要再keep-alive里面添加exclude属性，让详情页不要使用缓存，保存状态
  // created() {
  //  this.iid = this.$route.params.iid
  // }
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求数据
    getDetial(this.iid).then((res) => {
      console.log(res);
      // 分离数据
      // 1、获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3、获取店铺信息
      this.shop = new Shop(data.shopInfo);
      console.log(this.shop);

      // 4获取详细的商品图片信息
      this.detailInfo = new DetailInfo(data.detailInfo)

      // 5、获取商品参数
      this.itemParams = new ItemParams(data.itemParams.info, data.itemParams.rule)

      // 6、获取评论信息
      if (data.rate.cRate !== 0) {  //判断有无评论数据
        this.commentInfo = data.rate.list[0]
      }

      // 7、页面渲染完成后，会回来执行$nextTick（）函数
     /*  this.$nextTick(() => {
        根据模板内容，虽然DOM已经被渲染出来了
        但是图片依然是没有加载完，
        此时获取到的offsetTop是不包含图片的宽度的  获取的offsetTop值依旧不对
        this.offsetTopy = []
        this.offsetTopy.push(0)
        this.offsetTopy.push(this.$refs.params.$el.offsetTop)
        this.offsetTopy.push(this.$refs.comments.$el.offsetTop)
        this.offsetTopy.push(this.$refs.reCommends.$el.offsetTop)
        console.log(this.offsetTopy)
      }) */
    });

    //3、请求推荐商品数据
    getRecommend().then(res => {
      console.log(res);
      this.reCommends = res.data.list
    })
    this.getOffsetTopy = debounce(() => {
        this.offsetTopy.push(0)
        this.offsetTopy.push(this.$refs.params.$el.offsetTop)
        this.offsetTopy.push(this.$refs.comments.$el.offsetTop)
        this.offsetTopy.push(this.$refs.reCommends.$el.offsetTop)
        this.offsetTopy.push(Number.MAX_VALUE)
       
    }, 100)
  },
  mounted() {
     // 1、监听detailgoodsInfo里面图片加载完成
        //  debounce是防抖函数，避免频繁调用方法，造成性能浪费
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
        // 监听事件总线里面的发送的事件
    this.$bus.$on("detailImageLoad", () => {
      // 详细商品图片的加载完成是，刷新一遍页面
      newRefresh()
      //  图片加载完成，获取组件根元素的offsetTop
      // 防止频繁获取offsetTop值，使用防抖函数
      this.getOffsetTopy()
       
     }); 

    // 2、监听推荐商品图片的加载
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad', this.itemImgListener)
    // 大量重复代码。放到混入对象里面
  },   
  destroyed() {
    // 离开时，取消监听事件总线
    console.log('destroyed')
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  z-index: 10;
}
.detail-swiper {
  position: absolute;
  top: 44px;     
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #fff;
}
</style>

