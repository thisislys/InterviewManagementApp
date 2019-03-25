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
        <span>{{info.status==-1?"未开始":info.status==0?"已打卡":"已放弃"}}</span>
      </li>

      <li v-if="info.status==-1">
        <lable for="">取消提醒</lable>
        <switch :checked="info.remind==1" @change="cancelRemind" />
      </li>

    </ul>
    <section v-if="info.status==-1" class="action">
      <button @click="goCar">去打卡</button>
      <button @click="giveUp">取消面试</button>
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
      getDetail:"sign/getDetail",
      updatSignDetail:"sign/updatSignDetail"
    }),
    goCar(){
      wx.showToast({
        title:"正在打卡",
        icon:"'none"
      })
    },
    giveup(){
       wx.showModal({
         title:"温馨提示",
         content:"确定要放弃本次面试吗",
         success:res=>{
          //  await this.updatSignDetail({
             this.updatSignDetail({
             id:this.id,
             params:{ status:1}
           })
         }

       })
    },
    cancelRemind(){
      wx.showModal({
              title:"温馨提示",
              content:"确定要放弃本次面试吗",
              success:res=>{
                if(res.confirm){
                  console.log('确定')
             }
          }

        })
    }
  },
  onLoad(options){
    //获取id
   this.id=options.id;
  },
  async onShow(){
    // wx.showLoading({
    //   title:"加载中...",
    //   mask:true
    // })
   await this.getDetail(this.id);
   //修改标题
   wx.setNavigationBarTitle({
     title:this.info.company
   })
    // wx.hideLoading()//加载loading
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ul{
    width: 100%;
    height: 100%;
    li{
      width:100%;
      height: 88rpx;
      padding: 0 10rpx;
       box-sizing: border-box;
      // color: #eee3;
      border:1rpx dashed #eeeeee; 
      // white-space: nowrap;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span,switch{
      flex: 1;
      color: #333;
      line-height: 88rpx;
      }
      span,switch{
        padding: 0 20rpx;
        box-sizing: border-box;
      }
    }
  }
  .action{
    display: flex;
    margin: 50rpx 15rpx;
    button{
      flex: 1;
      height:120rpx;
      line-height: 120rpx;
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
