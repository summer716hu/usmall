import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import { reqgoodsCount, reqgoodsList } from '../../util/request';
const state={
    list:[],
    total:0,
    page:1,
    size:5,
}
const mutations={
    changeList(state,arr){
        state.list=arr
    },
    changeCount(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    },

}
const actions={
    requestgoodsList(context){
        reqgoodsList({
            size:context.state.size,
            page:context.state.page,
            istree:true
        }).then(res=>{
            // let arr=res.data.list;
            // arr.forEach(item=>{
            //     item.attrs=JSON.parse(item.attrs)
            // })
            context.commit('changeList',res.data.list)
        })
    },
    requestgoodsCount(context){
        reqgoodsCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    changeCurrentPages(context,page){
        context.commit('changePage',page)
        context.dispatch('requestgoodsList')
    }
}
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}