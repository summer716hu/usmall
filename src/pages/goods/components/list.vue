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
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" width="100">

      </el-table-column>

      <el-table-column prop="price" label="商品价格" width="100"> 

      </el-table-column>

      <el-table-column prop="market_price" label="市场价格" width="100">
         </el-table-column>

      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="是否新品" width="110">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="是否热卖" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
import { reqgoodsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      page: "goods/page",
      size: "goods/size",
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
      reqgoodsDel({ id: id }).then((res) => {
        alert("删除成功");
        this.requestgoodsList();
        // 重新获取总数
        this.requestgoodsCount();
        // 强制让页码数回到第一页
        // this.changeCurrentPages(1)
      });
    },
    ...mapActions({
      requestgoodsList: "goods/requestgoodsList",
      requestgoodsCount: "goods/requestgoodsCount",
      changeCurrentPages: "goods/changeCurrentPages",
    }),
    changeCurrentPage(p) {
      console.log(p);
      // 根据当前第几页去请求数据（去修改vuex中的数据）
      this.changeCurrentPages(p);
    },
  },
  mounted() {
    this.requestgoodsList();
    this.requestgoodsCount();
  },
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>