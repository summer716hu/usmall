<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="编号" width="100">
      </el-table-column>

      <el-table-column prop="title" label="轮播图标题" width="100">

      </el-table-column>

      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" alt="" />
        </template>
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
import { reqbannerDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
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
      reqbannerDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestbannerList();
      });
    },
    ...mapActions({
      requestbannerList: "banner/requestbannerList",
    }),
  },
  mounted() {
    this.requestbannerList();
  },
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>