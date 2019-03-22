<template>
  <div class="wrap">
    <ul>
      <li>
        <lable for="">面试地点</lable>
        <span>{{info.address.address}}</span>
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
        <span></span>
      </li>
      <li>
        <lable for="">取消提醒</lable>
        <switch :checked="!!info.remind" bindchange="switchiChange" />
      </li>
    </ul>
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

</style>
