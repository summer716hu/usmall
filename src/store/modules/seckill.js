import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import { reqseckList } from '../../util/request';
const state = {
    list: [],
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requestseckList(context) {
        reqseckList().then(res => {
            context.commit('changeList', res.data.list)
        })
    },
}
const getters = {
    list(state) {
        return state.list
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}