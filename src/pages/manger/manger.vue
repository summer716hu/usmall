<template>
<div>
   <el-button @click="willAdd" type="primary">添加</el-button>

   <!-- 添加子组件 -->
    <v-add :info='info' ref="one"></v-add>

<!-- 列表子组件 -->
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
     info:{
         isShow:false,
         title:'管理员添加',
         isAdd:true//默认添加
     }
 }
},
methods:{
    willAdd(){
        this.info.isShow=!this.info.isShow;
        this.info.title='管理员添加';
        this.info.isAdd=true;
        this.$refs.one.empty();
    },
    edit(){
        this.info.isShow=true;
        this.info.title='管理员修改';
        this.info.isAdd=false;
        this.$refs.one.look(id); 
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>