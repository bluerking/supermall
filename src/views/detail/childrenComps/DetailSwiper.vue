<template>
  <swiper class="detailswiper">
    <swiper-item 
      v-for="(item, index) in topImages"
      :key="index"
    >
      <img 
        :src="item" 
        alt=""
      >
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style scoped>
.detailswiper {
   height: 300px;
   overflow: hidden
}
/* .detail-swiper img {
  width: 100%;
} */
</style>