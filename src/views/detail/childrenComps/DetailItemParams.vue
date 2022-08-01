<template>
  <div>
    <table 
      v-if="Object.keys(itemParams).length !== 0" 
      class="params-info"
    >
      <!--添加v-if判断，获取数据时，会先获取本页面接口原始数据，再去获取从后台传过来的数据-->
      <tr
        v-for="(item, index) in itemParams.tables[0]"
        :key="index"
      >
        <th class="goods-info">
          {{ item[0] }}
        </th>
        <td 
          v-for="(i, index) in item.slice(1)" 
          :key="'first' + index"
          class="goods-size"
        >
          {{ i }}
        </td>
      </tr>
    </table>
    <table>
      <tr v-for="(item, index) in itemParams.set" :key="'second' + index">
        <!---给key添加唯一标识，区别同样key值-->
        <th class="info-key">{{ item.key }}</th>
        <td class="info-value">{{ item.value }}</td>
      </tr>
    </table>
    <div
      v-if="
        Object.keys(itemParams).length !== 0 && itemParams.image.length !== 0
      "
    >
      <img :src="itemParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailItemParams",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  padding: 0 10px;
}

.goods-info,
 
.goods-size {
  width: 20%;
  height: 60px;
  text-align: start;
}
 .info-key {
  width: 20%;
  height: 60px;
  padding-right: 30px;
  text-align: start;
 }
 .info-value {
  color: hotpink;
 }
</style>