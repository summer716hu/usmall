import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import {reqspecsList,reqspecsCount}  from '../../util/request'
const state={
    list:[],//请求回来的数据
    total:0,//请求回来的总数
    size:4,//每页展示的条数
    page:1,//当前第几页
}
const mutations={
    changeList(state,arr){
        state.list = arr
    },
    // 获取总数
    changeCount(state,num){
        state.total = num
    },
    // 修改当前页
    changePage(state,page){
        state.page=page
    }
}
const actions={
    requestspecsList(context){
        reqspecsList({
            size:context.state.size,
            page:context.state.page,
        }).then(res=>{
            let arr=res.data.list;
            arr.forEach(item=>{
                item.attrs=JSON.parse(item.attrs)
                console.log(item.attrs);
            })
            context.commit('changeList',res.data.list)
        })
    },
    // 请求获取总数
    requestspecsCount(context){
        reqspecsCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    // 修改当前的页码数
    changeCurrentPages(context,page){
        context.commit('changePage',page)
        // 根据当前点击的页码数，重新发送请求，由于mutations没有权限修改actions所以需要借助仓库（context）
        context.dispatch('requestspecsList')
    }
}
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}