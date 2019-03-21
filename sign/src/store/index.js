import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 挂载modules
import index from './modules/index'
import interview from './modules/interview'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index,
    interview
  },
  state: {
    info: {}  // 用户信息
  },
  mutations: {
    // 更新全局的state
    updateState(state, payload){
      state.info = payload;
    }
  },
  plugins: [createLogger()]
})
