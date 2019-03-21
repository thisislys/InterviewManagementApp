const state = {
  list: [],
  current: {
    company: '北京小桔科技有限公司',
    phone: '17621526605',
    address: '',
    description: ''
  }
}

const mutations = {
  updateState(state, payload){
    state.current = {...state.current, ...payload};
  }
}


const actions = {
  submit(state, payload){
    console.log('payload...', payload);
    return new Promise((resolve, reject)=>{
      setTimeout(function(){
        resolve();
      }, 5000);
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
