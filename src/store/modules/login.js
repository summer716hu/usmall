import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    list: sessionStorage.getItem('list') ? JSON.parse(sessionStorage.getItem('list')) : {},
    // JSON.parse() 方法将数据转换为 JavaScript 对象
}
const mutations = {
    changeList(state, obj) {
        state.list = obj;//获取到一个对象
        sessionStorage.setItem('list', JSON.stringify(obj))//JSON.stringify将 JavaScript 值转换为 JSON 字符串
    }
}

const actions = {
    requestuserList(context, obj) {
        context.commit('changeList', obj)
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}