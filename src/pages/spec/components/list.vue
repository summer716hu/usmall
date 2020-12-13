<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="规格名称" sortable width="180">
      </el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="warning" v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
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

    <!-- 分页效果 -->
    <el-pagination
      :current-page="page"
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqspecsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      page: "spec/page",
      size: "spec/size",
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
      reqspecsDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestspecsList();
        // 重新获取总数
        this.requestspecsCount()
        // 强制让页码数回到第一页
        // this.changeCurrentPages(1)
      });
    },
    ...mapActions({
      requestspecsList: "spec/requestspecsList",
      requestspecsCount:'spec/requestspecsCount',
      changeCurrentPages:'spec/changeCurrentPages'
    }),
    changeCurrentPage(p){
      console.log(p)
      // 根据当前第几页去请求数据（去修改vuex中的数据）
    this.changeCurrentPages(p)
    }
  },
  mounted() {
    this.requestspecsList();
    this.requestspecsCount()
  },
};
</script>
<style scoped>
</style>