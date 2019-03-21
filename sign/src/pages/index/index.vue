<template>
  <div class="wrap">
    <!-- 首页地图模块 -->
    <map
      id="map"
      :longitude="location.longitude"
      :latitude="location.latitude"
      subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
      scale="14"
      show-location
      show-compass
      :markers="markers"
      @markertap="markertap"
      @regionchange="regionChange"
    ></map>
    <!-- 重新定位图标 -->
    <cover-view class="current">
      <cover-image class="location" @tap="goCurrent" src="/static/images/location.png" />
      <button class="add" @tap="goAdd">添加面试</button>
      <cover-view class="my" @tap="goMy">
        <cover-image src="/static/images/my.png" />
      </cover-view>
    </cover-view>
    <!-- vuex最简单的demo -->
    <!-- <div>
      <button @click="btnClick('+')">+</button>
      <span>{{state}}</span>
      <button @click="btnClick('-')">-</button>
    </div> -->
  </div>
</template>

<script>
import card from '@/components/card'
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      // 用户当前位置
      location: {
        latitude: 40.03298,
        longitude: 116.29891
      },
      markers: [{
        iconPath: '/static/images/job.png',
        id: 0,
        latitude: 40.03298,
        longitude: 116.29891,
        width: 50,
        height: 50
      }]
    }
  },

  computed: {
    ...mapState({
      state: state=>state.index.count,
      state2: state=>state.index.count,
    })
  },

  components: {
    card
  },

  methods: {
    ...mapMutations({
      changeNum: 'index/changeCount'
    }),
    btnClick(type){
      this.changeNum(type);
    },
    regionChange(e){

    },
    // 点击标注物
    marketTap(e){

    },
    // 重新定位
    goCurrent(){
      getAuth('scope.userLocation', async ()=>{
        let location = await getLocation();
        wx.setStorageSync('location', location)
        this.location = location;
      })
    },
    // 去我的页面
    goMy(){
      wx.navigateTo({ url: '/pages/my/main' });
    },
    // 去添加面试页面
    goAdd(){
      wx.navigateTo({ url: '/pages/add/main' });
    }
  },

  created () {
    let location = wx.getStorageSync('location');
    this.location = location;
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 100%;
}
map{
  width: 100%;
  height: 100%;
  padding-bottom: 100rpx;
  box-sizing: border-box;
}
.location{
  position: fixed;
  bottom: 150rpx;
  width: 80rpx;
  height: 80rpx;
  left: 20rpx;
}
.add{
  position: fixed;
  width: 100%;
  height: 100rpx;
  background: #000;
  color: #fff;
  font-weight: 500;
  bottom: 0;
  left: 0;
  font-size: 40rpx;
}
.my{
  position: fixed;
  background: #fff;
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  bottom: 150rpx;
  width: 120rpx;
  height: 100rpx;
  right: 0;
  cover-image{
    width: 70rpx;
    height: 70rpx;
    margin-top:15rpx;
    margin-left: 15rpx;
    background: #eee;
    border-radius: 50%;
  }
}
</style>
