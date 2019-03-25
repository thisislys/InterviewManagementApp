<template>
  <main class="orderInfo">
    <ul v-if="list.length" class="orderInfo-text">
      <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <p>
          <span>{{item.company}}</span>
          <span :class="'tag'+(item.status+2)">{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
        </p>
        <h4>{{item.address.address}}</h4>
        <p>
          <span>面试时间：{{item.start_time}}</span>
          <span :class="'tag'+(2-item.status)">{{item.remind?'未提醒':'已提醒'}}</span>
        </p>
        <!-- <div>
          <button class="btnclass">打卡</button>
          <button>放弃</button>
        </div>-->
      </li>
    </ul>
    <p v-else class="none">当前分类还没有面试!</p>
  </main>
</template>

<script>
const moment = require("moment");
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    goDetail(id) {
      wx.navigateTo({
        url: "/pages/detail/main?id=" + id
      });
    }
  }
};
</script>

<style  lang="scss" scoped>

.orderInfo {
  width: 100%;
  height: 1470rpx;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  li {
    width: 100%;
    // height:380rpx;
    background: #f0f0f0;
    // box-shadow:5rpx 2rpx 2rpx 5rpx #cfcfcf;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30rpx;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
    h3 {
      width: 100%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 36rpx;
    }
    h4 {
      width: 100%;
      height: 60rpx;
      line-height: 60rpx;
      border-top: 1rpx dashed #cfcfcf;
      color: #666;
      font-size: 30rpx;
    }
    div,
    p {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      display: flex;

      button {
        width: 150rpx;
        height: 60rpx;
        line-height: 60rpx;
        border: 0;
        outline: none;
        font-size: 36rpx;
        border: 1rpx solid skyblue;
        border-radius: 20rpx;
      }
      button.btnclass {
        color: #ffffff;
        background: skyblue;
      }
    }
    p {
      justify-content: space-between;
      span:nth-child(1) {
        font-size: 30rpx;
      }
      span:nth-child(2) {
        color: skyblue;
      }
    }
  }
}
.none{
  padding: 100rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #666;
}
</style>