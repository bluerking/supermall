<template>
  <div>
    <h2>分类</h2>
    <scroll
      ref="scroll"
      :probe-type="3"
      @scroll="scrollPosition"
      class="wrapper"
    >
      <div></div>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTopClick" />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import { backTopMixin } from "@/common/mixin";

export default {
  name: "Category",
  components: {
    Scroll,
  },
  mixins: [backTopMixin],
  methods: {
    scrollPosition(position) {
      this.listenerShowBackTop(position);
    },
  },
};
</script>

<style scoped>
H2 {
  height: 44px;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  background-color: blueviolet;
  color: #fff;
}
</style>

