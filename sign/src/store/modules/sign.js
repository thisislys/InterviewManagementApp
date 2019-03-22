import {getSign} from '@/api/index'
const moment = require('moment')
const state = {
  active: 0,
  page: 1,
  pageSize: 10,
  list: []
}
const mutations = {
  updataState (state, payload) {
    for (let ind in payload) {
      state[ind] = payload[ind]
    }
    console.log(payload, state)
  }
}
const actions = {
  getList ({commit, state}, payload) {
    console.log('pppp', payload)
    return new Promise(async (resolve, reject) => {
      let params = {}
      if (state.active) {
        params.status = state.active - 2
      }
      let result = await getSign(params)
      result.data.forEach(item => {
        item.address = JSON.parse(item.address)
        item.start_time = formatTime (item.start_time)
      })
      commit('updataState', {list: result.data})
    }) 
  }
}
function formatTime (start_time) {
  return moment(start_time * 1000).format('YYYY-MM-DD HH:MM')
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
