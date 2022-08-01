<template>
  <div class="cart-list">
     <cart-list-item 
       v-for="(item, index) in goodsList" 
       :key="'key' + index"
       :product="item"
      />
  </div>
</template>

<script>
import CartListItem from './CartListItem';

import { transferComputedMixin } from '@/common/mixin';

export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  mixins: [transferComputedMixin]
}
</script>

<style scoped>

</style>