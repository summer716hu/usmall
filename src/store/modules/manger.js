import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);


import{requserList,requserCount} from '../../util/request'
const state={
list:[],
size:2,
page:1,
total:0,
};
const mutations={
    changeList(state,arr){
        state.list=arr
    },
    changeCount(state,num){//获取数据总条数
        state.total=num
    },
    changePage(state,page){//获取当前页
        state.page=page
    },
};
const actions={
    requestuserList(context){//
        requserList({
            size:context.state.size,
            page:context.state.page,
        }).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    requestuserCount(context){//请求获取总条数
        requserCount().then(res=>{
            // console.log(res);
            context.commit('changeCount',res.data.list[0].total);
        })
    },
    changeCurrentPages(context,page){//修改当前的页码数
            // console.log(context,page);
            context.commit('changePage',page);
            //mutations没有权限修改actions所以需要借助仓库（context）
            context.dispatch('requestuserList');
    }
};
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
    },
};
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}