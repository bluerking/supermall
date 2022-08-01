<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      class="tabTop"
      @tabClick="tabClick"
    />
    <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scrollPosition"
      @pullingUp="loadMore"
    >
      <home-swiper 
        :banners="banners"
        @swiperImageLoad="swiperImageLoad" 
      />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top 
      v-show="isShowBackTop" 
      @click.native="backTopClick" 
    />
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import HomeRecommendView from "./childrenComps/HomeRecommendView";
import FeatureView from "./childrenComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
// import BackTop from "@/components/content/backtop/BackTop";  多个组件中重复使用的子组件， 所以放到混入对象里面

import { getHomeMultidata, getHomeGoods } from "@/network/home";

// import { debounce } from "@/common/utils";  放到了common/mixin文件中了

import { itemListenerMixin, backTopMixin } from '@/common/mixin'

import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,  重复代码 放到混入对象里面
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null  重复代码 放到混入对象里面
    };
  },
  mixins: [itemListenerMixin, backTopMixin], //混入的写法：mixins：[mixin]
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 进入组件时，会自动使用activated()生命周期函数；
  // 设置scroll.vue滚动到离开时的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    console.log('进入时设置位置')
  },
  // 离开组件时，会自动使用deactivated()生命周期函数；
  // 记录下scroll.vue组件离开时滚动的位置
  deactivated() {
    // 1、保存y值
    this.saveY = this.$refs.scroll.getCurrentY()
    console.log(this.saveY)
    console.log('离开时记录位置')

    // 2、取消全局事件的监听（取消对事件总线的监听）
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    console.log('homeCreated')
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2、请求商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 这里图片确实被挂载了，但是还没有加载完成，没有占据高度
    // 3、监听goodsListItem里面图片加载完成  图片加载完成 刷新页面
      //  防抖函数
    // const newRefresh = debounce(this.$refs.scroll.refresh, 100);

    // 对监听的事件总线进行保存
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener); 
   
      // 这里监听图片加载完成自定义事件，首页和详情页代码重复，抽取到混入里面
  },
  methods: {
    // 可能点击第一个选项卡、也有可能点击第二个、第三个选项卡,所以使用switch结构语句
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backTopClick() {
    
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 800);  代码太长，在Scroll组件里面做封装
    //   // this.$refs.scroll.scrollTo(0, 0, 800); //重复的组件方法，放到混入对象里面去
    // },
    scrollPosition(position) {
      // 判断返回顶部backTop是否显示
      this.listenerShowBackTop(position)
      // this.isShowBackTop = -position.y > 1000;  重复代码放到混入对象里面，但是方法里面的代码不会合并，所以重新声明函数，在改方法内调用即可

      // 决定tabControl是否固定在顶部(fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop ? true : false
     
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 告诉scroll对象，上一次的上拉加载更多已经完成了
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.refresh();
    },
    //4、获取到tabControl的offsetTop
    // 组件对象是没有offsetTop的，但所有的组件都有一个属性$el,拿到组件挂载的根元素,获取顶部的偏移量
      swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关方法

    // 请求多个数据
    // axios本身就是一个promise，所以可以使用then、catch
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res)
        //函数调用完，作用域会被销毁，内存会被回收，释放所有变量
        // this.result = res  1、拿到所有返回的数据
        // this.banners = res.data.banner;  // 2.1、只拿banner里面所有的数据
        this.banners = res.data.banner.list; // 3.1、只拿list数据
        // this.recommends = res.data.recommend; // 2.2 只拿recommend里面所有的数据
        this.recommends = res.data.recommend.list; // 3.2只拿list数据

      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res)
        this.goods[type].list.push(...res.data.list);
      });
      this.goods[type].page += 1;
    }
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  /* 利用浏览器原生滚动时，为了让导航不跟随页面一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}
.tabTop {
  position: relative;
  z-index: 10;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
}
</style>