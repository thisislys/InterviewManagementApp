<template>
  <div class="wrap">
    <header>
        <span class="active">全部面试</span>
        <span>未面试</span>
        <span>已面试</span>
        <span>已放弃</span>
    </header>
    <view>
      我的列表
    </view>
  </div>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
     types:['全部面试','未面试','已面试','已放弃']
    }
  },

  computed: {
    
  },

  methods: {
    
  },

  onShow() {
   
  }
}
</script>

<style lang="scss" scoped>
header{
  background: #F4F6F9;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
 
  display: flex;
  align-items: center;
  span{
    flex: 1;
    text-align: center;
  }
  span.active{
    border-bottom:5rpx solid skyblue; 
  }
}
</style>
