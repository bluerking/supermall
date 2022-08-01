<template>
  <div 
    v-if="Object.keys(goods).length !== 0" 
    class="base-info"
  >
    <div class="info-title">
      {{ goods.title }}
    </div>
    <div class="info-price">
      <span class="n-price">
        {{ goods.realPrice }}
      </span>
      <span class="o-price">
        {{ goods.oldPrice }}
      </span>
      <span 
        v-if="goods.discount" 
        class="discount"
      >
        {{ goods.discount }}
      </span>
    </div>
    <div class="info-other">
      <!-- columns是一个数组 -->
      <!-- services也是一个数组 -->
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <!-- v-for遍历一个数字的时候，从 1 一直遍历到该数字 -->
      <span
        v-for="index in goods.services.length - 1"
        :key="index"
        class="info-service-item"
      >
        <img 
          :src="goods.services[index - 1].icon" 
          alt="" 
        >
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  padding: 0 10px;
  line-height: 25px;
}

.info-title {
  padding-top: 3px;
  font-size: 20px;
  font-weight: 500;
  color: black;
  text-align: justify;
}
.info-price {
  margin: 15px 0;
}
.n-price {
  font-size: 25px;
  color: hotpink;
}
.o-price {
  text-decoration: line-through;
}

.info-other {
  display: flex;
  margin-bottom: 5px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(204, 204, 204, 0.5);
}
.info-other span {
  flex: 1;
  text-align: center;
}
.info-other span:first-child {
  text-align: start;
}
.info-other span:nth-child(3) {
  text-align: end;
}

.discount {
  padding: 3px 8px;
  margin: 0 3px;
  border-radius: 10px;
  color: #fff;
  background: hotpink;
}
.info-service {
  display: flex;
  border-bottom: 5px solid rgba(205, 201, 201, 0.3);
  padding: 20px 0;
}
.info-service-item {
  flex: 1;
}
.info-service-item:nth-child(2) {
  text-align: center;
}
.info-service-item img {
  width: 15px;
  height: 15px;
}
</style>