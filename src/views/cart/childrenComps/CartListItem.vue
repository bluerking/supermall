<template>
  <div v-if="Object.keys(product).length !== 0">
    <div class="product-info">
      <check-button 
        @click.native="checkClick"
        :isChecked="product.checked"
      />
      <div class="item-image">
        <img 
          :src="product.imag" 
          alt="商品图片"  >
      </div>
      <div class="txt">
        <span class="title">{{ product.title }}</span>
        <span class="desc">{{ product.desc }}</span>
        <div class="count">
          <span class="price-left">￥{{ product.price}}</span>
          <span class="count-right">x{{ product.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
export default {
  name: "CartListItem",
  components: {
     CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  methods: {
    checkClick() {
      console.log('点击选中或者取消商品')
      this.$store.dispatch('cancleChecked', this.product)
    }
  },
  
};
</script>

<style scoped>
.product-info {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.item-image img {
 width: 80px;
 height: 100px;
 padding: 3px;
 border-radius: 10px;
}
.txt {
  width: calc(100% - 80px - 25px);
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-around;
  align-items: flex-start;
}
.title,
.desc {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count {
  position: relative;
  width: 100%;
  height: 20px;
}
.price-left {
 position: absolute;
 left: 0;
 color: orangered;
}
.count-right {
 position: absolute;
 right: 20px;
}

</style>