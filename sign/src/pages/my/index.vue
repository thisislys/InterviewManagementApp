<template>
  <div class="wrap">
    <header>
      <div class="avatar">
        <image src="/static/images/my.png" lazy-load="false"></image>
      </div>
      <p>176****6605</p>
    </header>
    <ul>
      <li>
        <icon type="waiting" size="18px" />
        <span>
          我的面试
        </span>
        <image src="/static/images/arrow.svg"></image>
      </li>
    </ul>
    <div class="phone" v-if="showPhoneDialog">
      <p>为了更好的使用我们的服务，我们需要获取你的手机号码</p>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">允许获取手机号</button>
    </div>
  </div>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      showPhoneDialog: true
    }
  },

  computed: {
    ...mapState({
      info: state=>state.info
    })
  },

  methods: {
    getPhoneNumber(e){
      console.log('e...', e);
    }
  },

  onShow() {
    if (!this.info.phone){
      this.showPhoneDialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  background: #F4F6F9;
  width: 100%;
  height: 350rpx;
  box-sizing: border-box;
  padding: 50rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .avatar{
    width: 100rpx;
    height: 100rpx;
    background: #fff;
    text-align: center;
    padding: 20rpx;
    border-radius: 50%;
  }
  image{
    width: 90%;
    height: 90%;
  }
}
.phone{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    width: 60%;
    background: #fff;
  }
  button{
    width: 60%;
  }
}
li{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 50rpx 40rpx 0 40rpx;
  span:nth-child(2){
    flex: 1;
    margin-left: 40rpx;
    color: #666;
    font-size: 36rpx;
  }
  image{
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
