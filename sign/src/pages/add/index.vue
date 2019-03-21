<template>
  <div class="wrap">
    <p>面试信息</p>
    <ul>
      <li>
        <lable for="">公司名称</lable>
        <input type="text" v-model="current.company" placeholder="请输入公司名称">
      </li>
       <li>
        <lable for="">公司电话</lable>
        <input type="number" v-model="current.phone" placeholder="请输入面试联系人电话" maxlength="11">
      </li>
       <li>
        <lable for="">面试时间</lable>
        <picker
          mode="multiSelector"
          :range="dateRange"
          :value="info.date"
          @change="dateChange"
          @columnchange="columnChange"
        ><view class="date">{{dateShow}}</view>
        </picker>
      </li>
       <li>
        <lable for="">面试地址</lable>
        <input @tap="goSearch" type="text" disabled v-model="current.address.address" placeholder="请选择面试地址">
      </li>
    </ul>
    <p>备注信息</p>
    <textarea type="text" v-model="current.description" placeholder="备注信息(可选，100个字以内)"/>
    <button :class="btnEnable?'': 'disable'" @click="submit">确认</button>
  </div>
</template>


<script>
import {mapState, mapActions} from 'vuex';
const moment = require('moment');

const range = [
  [0,1,2,3,4,5,6,7,8,9],
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  ['00分','10分','20分','30分','40分','50分']
];
export default {
  data () {
    return {
      info: {
        date: [0,0,0],
      }
    }
  },
  created(){
     // 如果当前时间是十一点之后，过滤掉今天
    if (moment().hour() == 23){
      this.info.date = [1,0,0];
    }
  },
  computed: {
    ...mapState({
      current: state=>state.interview.current
    }),
    // 按钮是否可点击
    btnEnable(){
      // 判断公司名称是否为空
      if (!this.current.company){
        return false;
      }
      // 判断手机号是否符合规范
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.current.phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.current.phone)){
        return false;
      }
      // 判断公司地址
      if (!this.current.address.address){
        return false;
      }
      return true;
    },
    // 处理面试日期
    dateRange(){
      let dateRange = [...range];
      // 如果时间是今天，过滤掉现在之前的小时
      if (!this.info.date[0]){
        dateRange[1] = dateRange[1].filter(item=>{
          return item>moment().hour();
        })
      }else{
        dateRange[1] = range[1]
      }
      // 格式化小时
      dateRange[1] = dateRange[1].map(item=>{
        return item+'点'
      })
      // 计算当前日期之后的十天
      dateRange[0] = dateRange[0].map(item=>{
        return moment().add(item, 'days').date()+'号'
      })
      return dateRange;
    },
    // 显示的日期
    dateShow(){
      return moment()
      .add(this.info.date[0], 'd')
      .add(this.info.date[1]+1, 'h')
      .minute(this.info.date[2]*10)
      .format('YYYY-MM-DD HH:mm');
    }
  },
  methods: {
    ...mapActions({
      submitInterview: 'interview/submit'
    }),
    // 监听多列选择器每列变化
    columnChange(e){
      let {column, value} = e.target;
      let date = [...this.info.date];
      date[column] = value;
      this.info.date = date;
    },
    // 去选择地址
    goSearch(){
      wx.navigateTo({ url: '/pages/search/main' });
    },
    // 提交添加面试
    async submit(){
      // 判断公司名称是否为空
      if (!this.current.company){
        wx.showToast({
          title: '请输入公司名称', //提示的内容,
          icon: 'none', //图标,
        });
        return false;
      }
      // 判断手机号是否符合规范
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.current.phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.current.phone)){
        wx.showToast({
          title: '请输入面试联系人的手机或座机', //提示的内容,
          icon: 'none', //图标,
        });
        return false;
      }
      // 判断公司地址
      if (!this.current.address.address){
        wx.showToast({
          title: '请选择公司地址', //提示的内容,
          icon: 'none', //图标,
        });
        return false;
      }
      // 添加时间戳到表单
      this.current.start_time = moment(this.dateShow).unix();
      let data = await this.submitInterview(this.current);
      console.log('data...', data);
      //处理添加结果
      if(data.code==0){
wx.showToast({
  title:"添加面试成功",
  icon:"none",
  success:res=>{
    wx.navigateTo({
      url:'/pages/index/main'
    })
  }
})
      }else{
        wx.showToast({
          title:data.msg,
          icon:'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 100%;
}
p{
  font-size: 34rpx;
  padding: 15rpx 0 15rpx 30rpx;
  background: #f6f6f6;
}
ul{
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  background: #fff;
}
li{
  width: 720rpx;
  height: 88rpx;
  margin-left: 30rpx;
  border-bottom: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  lable{
    color: #666;
    width: 170rpx;
    font-size: 30rpx;
  }
  input,picker{
    flex: 1;
    font-size: 30rpx;
    // background: #eee;
    color: #333;
    height: 88rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 30rpx;
    box-sizing: border-box;
  }
  .date{
    width: 100%;
    line-height: 88rpx;
  }
}
li:last-child{
  border: none;
}
textarea{
  font-size: 30rpx;
  // background: #eee;
  color: #333;
  width: 690rpx;
  height: 200rpx;
  margin: 30rpx;
  box-sizing: border-box;
  padding: 10rpx;
  border: 1rpx solid #c0c0c0;
  border-radius: 5rpx;
}
button{
  margin-top: 50rpx;
  color: #fff;
  background: #197DBF;
}
button.disable{
  background: #999;
}
</style>
