<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="width">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="values"
              type="datetimerange"  
              range-separator="至"
              begintime-placeholder="开始日期"
              endtime-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="changeCate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  商品分类 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="--请选择--">
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <!-- 动态循环添加数据  商品分类 -->
            <el-option
              v-for="item in goodList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqseckAdd, reqseckListOne, reqseckEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      goodList: "goods/list",
      cateList: "classify/list",
      seckList: "seck/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      values: [],
      secondCate: [], //用于存放二级分类
      form: {
        first_cateid: 0,
        second_cateid: 0,
        begintime: 0,
        endtime: 0,
        title: "",
        status: 1,
        goodsid: 0,
      },
    };
  },
  
  methods: {
    //让弹框消失
    hide() {
      this.info.isShow = false;
    },

    // 清空数据
    empty() {
      this.form = {
        first_cateid: 0,
        second_cateid: 0,
        begintime: 0,
        endtime: 0,
        title: "",
        status: 1,
        goodsid: 0,
      };
    },
    
    ...mapActions({
      requestgoodsList: "goods/requestgoodsList",
      requestcateList: "classify/requestcateList",
      requestseckList: "seck/requestseckList",
    }),
    // 修改二级分类
    changeCate() {
      this.secondCate = this.cateList.find((item) => {
        return item.id == this.form.first_cateid;
      });
    },

    //添加
    add() {
      this.form.begintime= Date.parse(this.values[0]);
      this.form.endtime=Date.parse(this.values[1]);
      reqseckAdd(this.form).then((res) => {
        console.log(res);
        this.hide();
        this.requestseckList();
      });
    },
    // 查并获取一条数据
    look(id) {
      this.values=[];
      reqseckListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.values.push(new Date(parseInt(this.form.begintime)))
        this.values.push(new Date(parseInt(this.form.endtime)))
      });
    },
    // 修改
    update() {
      this.form.begintime=Date.parse(this.values[0]);
      this.form.endtime=Date.parse(this.values[1]);
      reqseckEdit(this.form).then((res) => {
        this.hide();
        // this.requestcateList();
        this.requestseckList();
      });
    },
  },
  mounted() {
    this.requestgoodsList();
    this.requestcateList();
    this.requestseckList();
    
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 2px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>