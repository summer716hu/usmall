<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <!-- <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column> -->

      <el-table-column prop="title" label="活动名称" width="100">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqseckDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      reqseckDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestseckList();
        // 重新获取总数
        // this.requestseckCount();
        // 强制让页码数回到第一页
        // this.changeCurrentPages(1)
      });
    },
    ...mapActions({
      requestseckList: "seck/requestseckList",
    }),
  },
  mounted() {
    this.requestseckList();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>