import {
  getSign,
  getSignDetail,
  updateSignDetail
} from '@/api/index'
const moment = require('moment')
const state = {
  active: 0,
  page: 1,
  pageSize: 3,
  list: [],
  info: {},
  hasMore: true
}
const mutations = {
  updataState(state, payload) {
    if (payload.list) {
      if (payload.list.length === state.pageSize * state.page) {
        state.hasMore = true
      } else {
        state.hasMore = false
      }
    }
    // 
    for (let ind in payload) {
      state[ind] = payload[ind]
    }
    // payload=JSON.parse(payload.page)
  }
}
const actions = {
  //获取面试列表
  getList({
    commit,
    state
  }, payload) {
    return new Promise(async (resolve, reject) => {
      let params = {};
      if (state.active) {
        params.status = state.active - 2;
      }
      params.page = state.page;
      params.pageSize = state.pageSize;
      let result = await getSign(params);
      console.log(result, 'aaaaaaaaa')

      result.data.forEach(item => {
        item.address = JSON.parse(item.address)
        item.start_time = formatTime(item.start_time)
      })

      //判断是替换还是添加
      if (state.page === 1) {
        commit('updataState', {
          list: result.data
        })
      } else {
        commit('updataState', {
          list: [...state.list, ...result.data]
        })
      }
      //调用resolve通知前端
      resolve();
    })
  },

  // 获取面试详情
  getDetail({
    commit
  }, payload) {
    return new Promise(async (resolve, reject) => {
      let data = await getSignDetail(payload);
      if (data.data.address) {
        data.data.address = JSON.parse(data.data.address);
      }
      data.data.start_time = formatTime(data.data.start_time);
      commit('updateState', {
        info: data.data
      });
      resolve();
    })
  },
  // 更新面试状态
  updateDetail({
    commit,
    dispatch
  }, payload) {
    return new Promise(async (resolve, reject) => {
      let data = await updateSignDetail(payload.id, payload.params);
      if (data.code == 0) {
        // 重新获取详情
        dispatch('getDetail', payload.id);
      }
      resolve(data);
    })
  }
}

function formatTime(start_time) {
  return moment(start_time * 1000).format('YYYY-MM-DD HH:MM')
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
