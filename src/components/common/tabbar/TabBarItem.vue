<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <div :style="activeStyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
  name: 'TabBarItem',
  computed: {
    isActive() {
    return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
    return this.isActive? {color: this.activeColor} : {}
   }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
    default: 'pink'
   }
  },
  methods: {
    itemClick() {
    this.$router.replace(this.path)
    },
  }
}
</script>

<style>
.tab-bar-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center ;
  flex: 1;
  /* text-align: center; */
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
}
/* .active {
  color: deeppink;
} */
</style>