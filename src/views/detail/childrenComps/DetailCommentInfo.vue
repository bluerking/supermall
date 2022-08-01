<template>
  <!-- 使用props从父组件传过来数据时，必须先判断是否为空，不为空时，再渲染 -->
  <div 
    v-if="Object.keys(commentInfo).length !== 0" 
    class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-user">
      <img 
        :src="commentInfo.user.avatar" 
        alt="" 
      >
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | dateTransfer }}</span>
        <span>{{ commentInfo.style.split(" ")[0] }}</span>
        <span>{{ commentInfo.style.split(" ")[1] }}</span>
      </div>
    </div>
    <div class="user-photo">
        <img 
          v-for="(item, index) in commentInfo.images" 
          :key="'item' + index"
          :src="item" 
          alt=""
        >
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils.js'
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentTime: "",
    };
  },
  filters: {
    dateTransfer(dateVal) {
      // 1、将时间戳转为Date对象
      const date = new Date(dateVal * 1000);
      // 2、将date进行格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 0 10px;
}
.info-header {
  overflow: hidden;
  padding: 15px 0;
}
.header-title {
  float: left;

}
.header-more {
  float: right;
}
.info-user {
  padding: 15px 0;
}
.info-user img {
  width: 35px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 50%;
}

.info-detail p {
  line-height: 20px;
}
.info-other {
  line-height: 25px;
} 
.user-photo {
  display: flex;
}
.user-photo img {
  width: 30%;
  padding: 5px;
}
</style>