import {
    getSignList,
    getSignDetail,
    updateSignDetail
} from '@/api/index';
const moment = require('moment');

const state = {
    active: 0, //表示当前面试类型，0表示全部，1表示未开始，1表示已打卡，2表示已放弃
    list: [], //面试列表
    info: {}, //面试详情数据
    hasMore: true, //是否有更多数据
    page: 1, //当前页码
    pageSize: 3 //每页数据
}

const mutations = {
    updateState(state, payload) {
        // 判断是否还有更多页码
        if (payload.list) {
            if (payload.list.length === state.pageSize * state.page) {
                state.hasMore = true
            } else {
                state.hasMore = false
            }
        }
        for (let key in payload) {
            state[key] = payload[key]
        }
    }
}

const actions = {
    // 获取面试列表
    getList({
        commit,
        state
    }, payload) {
        console.log('payload...', payload);
        return new Promise(async(resolve, reject) => {
            let params = {};
            // 修正面试状态
            if (state.active) {
                params.status = state.active - 2;
            }
            // 拼接面试页码和每页数量
            params.page = state.page;
            params.pageSize = state.pageSize;
            let result = await getSignList(params);
            result.data.forEach(item => {
                    item.address = JSON.parse(item.address);
                    item.start_time = formatTime(item.start_time);
                })
                // 判断是替换还是追加
            if (state.page === 1) {
                commit('updateState', {
                    list: result.data
                })
            } else {
                commit('updateState', {
                    list: [...state.list, ...result.data]
                })
            }
            // 调用resolve通知前端
            resolve();
        })
    },
    // // 获取面试详情
    // getDetail({
    //     commit
    // }, payload) {
    //     return new Promise(async(resolve, reject) => {
    //         let data = await getSignDetail(payload);
    //         if (data.data.address) {
    //             data.data.address = JSON.parse(data.data.address);
    //         }
    //         data.data.start_time = formatTime(data.data.start_time);
    //         commit('updateState', {
    //             info: data.data
    //         });
    //         resolve();
    //     })
    // },
    // // 更新面试状态
    // updateDetail({
    //     commit,
    //     dispatch
    // }, payload) {
    //     return new Promise(async(resolve, reject) => {
    //         let data = await updateSignDetail(payload.id, payload.params);
    //         console.log('data...', data);
    //         if (data.code == 0) {
    //             // 重新获取详情
    //             dispatch('getDetail', payload.id);
    //         }
    //         resolve(data);
    //     })
    // }
}

function formatTime(start_time) {
    return moment(start_time * 1000).format('YYYY-MM-DD HH:mm');
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}