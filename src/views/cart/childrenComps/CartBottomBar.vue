<template>
  <div class="bottom-bar">
    <div class="more-choice">
      <check-button class="multiple-btn" />
      <span>全选</span>
    </div>
    <span class="total">合计 {{ totalPrice }}</span>
    <div class="payment">
      <span>去支付({{ totalCount }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import { transferComputedMixin } from "@/common/mixin";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  mixins: [transferComputedMixin],
  computed: {
    totalPrice() {
      return "￥" + this.goodsList
          .filter((item) => item.checked == true).reduce((preV, currentV) => {
            return (preV += currentV.price * currentV.count);
          }, 0).toFixed(2);
    },
    totalCount() {
      return this.goodsList
        .filter((item) => item.checked == true).reduce((preV, currentV) => {
          return preV += currentV.count;
        }, 0);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 44px;
  background-color: #eee;
}
.more-choice {
  display: flex;
  height: 44px;
  align-items: center;
}
.multiple-btn {
  margin: 0 10px;
}
.payment {
  width: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: orangered;
  color: #fff;
}
.total {
  flex: 1;
  margin-left: 10px;
}
</style>