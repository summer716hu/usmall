<template>
  <div >
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all>
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <!-- 作用域插槽 -->
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.uid)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  components: {},
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      requestmemberList: "vip/requestmemberList"
    }),

    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    // del(id) {
    //   requserDel({ uid: id }).then((res) => {
    //     alert("删除成功");
    //     //自动刷新，就是再发送一遍请求
    //     this.requestuserList();//重新获取列表页
    //     this.requestuserCount();//重新获取总条数
    //     // this.changeCurrentPages(1);
    //   });
    // },
  },
  mounted() {
    this.requestmemberList();
  },
};
</script>
<style scoped>
</style>