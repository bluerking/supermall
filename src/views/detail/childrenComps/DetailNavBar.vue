<template>
  <div>
    <nav-bar>
      <div 
        slot="center"
        class="titles" 
      >
        <div 
          v-for="(item, index) in titles" 
          :key="index" 
          class="titles-item"
          :class="{active: currentIndex === index}"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <div 
        slot="left"
        class="left"
        @click="backClick"
      >
      <img 
        src="~@/assets/img/detail/back.svg" 
        alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.titles {
  display: flex;
}
.titles-item {
  flex: 1;
}
.left {
  text-align: center;
}
.left img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.active {
  color: hotpink;
}
</style>
