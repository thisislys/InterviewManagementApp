<template>
  <div class="wrap">
    <ul>
      <li>
        <lable for="">面试地点</lable>
        <span>{{info.address}}</span>
      </li>
      <li>
        <lable for="">面试时间</lable>
        <span>{{info.state_time}}</span>
      </li>
      <li>
        <lable for="">联系方式</lable>
        <span>{{info.phone}}</span>
      </li>
      <li>
        <lable for="">是否提醒</lable>
        <span>{{info.remind?"未提醒":"已提醒"}}</span>
      </li>
      <li>
        <lable for="">面试状态</lable>
        <span>{{info.status==-1?"未开始":info.status==0?"已打卡":"已放弃"}}</span>
      </li>
      <li v-if="info.status==-1">
        <lable for="">取消提醒</lable>
        <switch :checked="!!info.remind" bindchange="switchiChange" />
      </li>
    </ul>
    <section v-if="info.status==-1">
      <button>去打卡</button>
      <button>取消面试</button>
    </section>
  </div>

</template>

<script>

import {mapState,mapActions} from 'vuex'

export default {
  data () {
    return {
    
    }
  },
  computed:{
    ...mapState({
      info:state=>state.sign.info
    })
  },
  methods:{
    ...mapActions({
      getDetail:"sign/getDetail"
    })
  },
  onLoad(options){
    //获取id
   this.id=options.id;
  },
  async onShow(){
  
    wx.showLoading({
      title:"加载中...",
      mask:true
    })
   await this.getDetail(this.id);
   wx.hideLoading()//加载loading
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  ul{
    width: 100%;
    height: 100%;
    li{
      width:100%;
      height: 88rpx;
      color: #eee3;
      border:1rpx dashed #eeeeee; 
      span,switch{
      flex: 1;
      color: #333;
      line-height: 88rpx;
      }
    }
  }
  .action{
    display: flex;
    margin: 50rpx 15rpx;
    button{
      flex: 1;
      color: #fff;
      margin: 15rpx;
    }
    button:first-child{
      background: #197dbf;

    }
     button:last-child{
      background: #dc4e42;
      
    }
  }
}

</style>
