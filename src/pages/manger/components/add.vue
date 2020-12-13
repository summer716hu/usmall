<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="--请选择--">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 动态循环添加数据  角色分类 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { requserAdd, requserListOne, requserEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      //   isShow: true,
      form: {//设置初始值
        roleid: "",
        username:'',
        password:'',
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //取消弹框
    hide() {
      this.info.isShow = false;
    },
    // 重置
    empty(){
      this.form={
        roleid: "",
        username:'',
        password:'',
        status: 1,
      }
    },
    ...mapActions({
    requestRoleList:'role/requestRoleList',
    requestuserList:'manger/requestuserList',
     requestuserCount:'manger/requestuserCount'
    }),
    //添加
    add() {
      requserAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        this.requestuserList();
        this.requestuserCount();
      
      });
    },
    // 查并获取一条数据
    look(id) {
      requserListOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password='';
        this.form.uid = id;
      });
    },
    // 修改
    update() {
      requserEdit(this.form).then((res) => {
        this.hide();
        this.requestuserList();
        this.empty()
      });
    },
  },
  mounted() {//若果页面上没有数据，则请求
      if(this.roleList.length==0){
          this.requestRoleList()
      }
  },
};
</script>
<style scoped>
</style>