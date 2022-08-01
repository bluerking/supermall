import { debounce } from "@/common/utils";
import BackTop from '@/components/content/backtop/BackTop'

// 使用mapGetters将getters映射到组件的计算属性里面
// 因为多个地方使用，所以放入混入对象里面
import { mapGetters } from 'vuex' 

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
   // 监听goodsListItem里面图片加载完成
    
      //  防抖函数
      let newRefresh = debounce(this.$refs.scroll.refresh, 100);

      // 对监听的事件总线进行保存
      this.itemImgListener = () => {
        newRefresh()
      }
    this.$bus.$on("itemImageLoad", this.itemImgListener); 
  }
}


// 返回顶部的混入对象
export const backTopMixin = {
  components: {
   BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 800)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
     },
  }
}

// 将getters映射到组件计算属性里面的 混入对象

export const transferComputedMixin = {
  computed: {
    ...mapGetters([
      'goodsCount', 'goodsList'
    ])
  }
}