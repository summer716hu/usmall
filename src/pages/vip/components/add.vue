<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <!-- <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button> -->
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqmemberListOne, reqmemberEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      vipList: "vip/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      //   isShow: true,
      form: {
        //设置初始值
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //取消弹框
    hide() {
      this.info.isShow = false;
    },
    // 重置
    empty() {
      this.form = {
        id: "",
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      requestmemberList: "vip/requestmemberList",
    }),
    //添加
    // add() {
    //   requserAdd(this.form).then((res) => {
    //     this.hide();
    //     this.empty();
    //     this.requestuserList();
    //     this.requestuserCount();

    //   });
    // },
    // 查并获取一条数据
    look(uid) {
      reqmemberListOne({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = uid;
        this.form.phone = phone;
      });
    },
    // 修改
    update() {
      reqmemberEdit(this.form).then((res) => {
        this.hide();
        this.requestmemberList();
        this.empty();
      });
    },
  },
  mounted() {
    //若果页面上没有数据，则请求
    if (this.vipList.length == 0) {
      this.requestmemberList();
    }
  },
};
</script>
<style scoped>
</style>