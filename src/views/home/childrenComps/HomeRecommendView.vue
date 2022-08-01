<template>
  <div class="recommend">
   <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
   <a :href="item.link" title="推荐的商品">
   <img :src="item.image" alt="">
   <div class="text-align">{{item.title}}</div>
   </a>
   </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
      return []
    }
  }
 }
}
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 25px;
  border-bottom: 10px solid rgba(189, 186, 186, 0.4);
  font-size: 14px;

}
.recommend-item {
flex: 1;
}
.recommend-item a {
  display: inline-block;
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  padding: 5px;
}
</style>>
 
