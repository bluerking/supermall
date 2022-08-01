<template>
  <div class="detail-goods-info">
    <p>{{ detailInfo.desc }}</p>
    <span>{{ detailInfo.key }}</span>
    <ul>
      <li 
        v-for="(item, index) in detailInfo.list" 
        :key="index"
      >
        <img 
          @load="imageLoad"
          :src="item" 
          alt=""
        >
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imageLoad() {
    this.$bus.$emit('detailImageLoad')
    }
  }
}
</script>

<style scoped>
.detail-goods-info {
  padding: 15px 10px 0;
}
.detail-goods-info p {
  padding: 15px 0;
  text-align:justify;

}
.detail-goods-info span {
  line-height: 20px;
}
li {
  list-style: none;
}
li img {
 width: 100%;
}
</style>