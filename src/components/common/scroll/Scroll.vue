<template>
  <div 
    ref="wrapper" 
    class="wrapper"
  >
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1、创建BScroll对象,初始化scroll
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 2、监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
      this.$emit('scroll', position)
    });
    }

    // 3、监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    }
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll  && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
       this.scroll.finishPullUp()
    },
    getCurrentY() {
      return this.scroll && this.scroll.y
    }
  },
};
</script>

<style scoped>
</style>