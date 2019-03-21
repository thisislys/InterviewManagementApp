const state = {
  count: 1
};

const getters = {

};

// 同步改变
const mutations = {
  changeCount(state, payload){
    console.log('state...', state, payload);
    payload === '+'?state.count++: state.count--;
  }
};

// 异步改变
const actions = {

};

export default {
  // 命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
