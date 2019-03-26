import {
  addSign
} from '@/api/index'
const state = {
  list: [],
  current: {
    company: '',
    phone: '',
    address: '',
    description: ''
  }
}

const mutations = {
  updateState(state, payload) {
    state.current = {
      ...state.current,
      ...payload
    };
  }
}

const actions = {
  async submit(state, {...payload}) {
    return new Promise(async(resolve, reject) => {
      //填充经纬度
      payload.latitude = payload.address.location.lat;
      payload.longitude = payload.address.location.lng;
      //序列化地址
      payload.address = JSON.stringify(payload.address);
      let result = await addSign(payload);
      resolve(result)
    })

  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
