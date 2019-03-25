<template>
    <main class="orderInfo">
    
   <!-- <p @click="goDetail(5)">详情</p> -->
    <ul  v-for="item in list" :key="item.id" class="orderInfo-text" @click="goDetail(item.id)">
        <li>
          <h3>{{item.company}}</h3>
          <p>
            
            <span>
              {{item.start_time}}
              </span>
          </p>
          <div>
            <button class="btnclass">未开始</button>
            <button>未提醒</button>
          </div>
          <h4>
            {{item.address.address}}
          </h4>
        </li>
      </ul> 
    </main>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    formatAddress(adress) {
     
      address = JSON.parse(address);
      //  console.log(address,'8989')
      return address.address
    },
    formatTime (start_time) {
      return moment(start_time*1000).format('YYYY-MM-DD HH:MM')
    },
    goDetail(id){
      // console.log('iddd',id)
      wx.navigateTo({
        url:"/pages/signList/detail/main?id="+id
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.orderInfo{
  width: 100%;
  height: 100%;
  background:skyblue;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
  li{
    width: 100%;
    // height:380rpx;
    background: #ffffff;
    // box-shadow:5rpx 2rpx 2rpx 5rpx #cfcfcf; 
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius:30rpx;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box; 
    h3{
      width: 100%;
      height:70rpx;
      line-height:70rpx;
      font-size:36rpx; 

    }
    h4{
      width: 100%;
      height:60rpx;
      line-height:60rpx;
      border-top:1rpx dashed #cfcfcf;
      color: #666;
      font-size: 30rpx;
    }
    div,p{
      width: 100%;
      height:80rpx;
      line-height: 80rpx;
      display: flex;
      button{
        width: 200rpx;
        height:60rpx;
        line-height:60rpx;
        border: 0;
        outline: none;
        font-size:36rpx; 
        font-size: 36rpx;
        border: 1rpx solid skyblue;
        border-radius:20rpx; 
      }
      button.btnclass{
        color:#ffffff;
        background: skyblue
      }
    }
    p{
      justify-content: space-between;
      span:nth-child(1){
        font-size: 40rpx;
      }
      span:nth-child(2){
        color: skyblue;
      }
    }
  }
}
</style>