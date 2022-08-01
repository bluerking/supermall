<template>
  <div 
    class="back-top"
  >
    <img 
      src="~@/assets/img/common/top.png" 
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'BackTop'
  
}
</script>

<style scoped>
.back-top {
 position: fixed;
 bottom: 55px;
 right: 10px;
 width: 44px;
 height: 44px;
}
.back-top img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>