import {getSign,getSignDetail} from '@/api/index'
const moment = require('moment')
const state = {
  active: 0,
  page: 1,
  info:{},//面试详情数据
  pageSize: 10,
  list: []
}
const mutations = {
  updataState (state, payload) {
    for (let ind in payload) {
      state[ind] = payload[ind]
    }
    
  }
}
const actions = {
  //获取面试列表
  getList ({commit, state}, payload) {
   
    return new Promise(async (resolve, reject) => {
      let params = {};
     
      if (state.active) {
        params.status = state.active - 2
      }
      let result = await getSign(params);
      result.data.forEach(item => {
        item.address = JSON.parse(item.address)
        item.start_time = formatTime (item.start_time)
      })
      commit('updataState', {list: result.data})
    }) 
  },
  //获取面试详情
  getDetail({commit},payload){
    console.log(payload,'pay')
    return new Promise(async (resolve,reject)=>{
       let data=await getSignDetail(payload);
       console.log("data",data);
       if(data.data.address){
         data.data.address=JSON.parse(data.data.reject)
       }
       data.data.start_time=formatTime(data.data.start_time)
       commit('updataState',{info:data.data});
       setTimeout(function(){
         resolve( )
       },5000)
    })
  }
}

//时间格式
function formatTime (start_time) {
  return moment(start_time * 1000).format('YYYY-MM-DD HH:MM')
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}