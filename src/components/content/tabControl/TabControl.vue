<template>
  <div class="tab-control">
    <div 
      v-for="(item, index) in titles" 
      :key="index" 
      class="tab-control-item " 
      :class="{active: currentIndex === index}" 
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
   }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  font-size: 14px;
  line-height: 44px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.active {
  color: hotpink;
}
.active span {
  padding: 3px 5px;
  border-bottom: 2px solid hotpink;

}
</style>