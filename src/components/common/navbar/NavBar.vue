<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "NavBar",
};
</script>
  
  <style scoped>
.nav-bar {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  line-height: 44px;
  box-shadow: 0 1px 1px 1px rgb(204, 204, 204, 0.3);
}
.left,
.right {
  width: 60px;
  height: 44px;
  text-align: center;
}
.left {
  float: left;
}

.right {
  float: right;
}

.center {
  margin: 0 60px;
  text-align: center;
  height: 44px;
}
</style>