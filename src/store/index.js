import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'//菜单管理
import role from './modules/role'//角色管理
import manger from './modules/manger'//管理员管理
import classify from './modules/classify'//商品分类页
import spec from './modules/spec'//商品规格页
import login from './modules/login'//登录页
import goods from './modules/goods'//商品管理页
import vip from './modules/vip'//会员页
import banner from './modules/banner'//banner页
import seck from './modules/seckill'//seck页
export default new Vuex.Store({
    modules: {
        menu,
        role,
        manger,
        classify,
        spec,
        login,
        goods,
        vip,
        banner,
        seck,
    }
})