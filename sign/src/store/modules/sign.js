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
    
    return new Promise(async (resolve,reject)=>{
       let data=await getSignDetail(payload);
       console.log(data,'get');
       if(data.data.address){
        //  console.log(data.data.address,'ss')
         data.data.address=JSON.parse(data.data.address);
         console.log(data.data.address,'ss')
       }
        commit('updataState',{info:data.data});
        resolve( )
    })
  },

  //updatSignDetail更新数据状态

  updatSignDetail({commit,dispatch},payload){
    return new Promise(async(resolve,reject)=>{
      let data=await updatSignDetail(payload.id,payload.params);
      console.log('data',data);
      if(data.code==0){
        dispatch('getDetail',payload.id);
      }
      resolve(data);
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