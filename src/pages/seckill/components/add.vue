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
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
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
          <el-select v-model="form.specsid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  商品分类 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
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
      specList: "spec/list",
      cateList: "classify/list",
      seckList: "seck/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      secondCate: [], //用于存放二级分类
      secondSpec: [], //用来存放规格属性
      value2: [],
      form: {
        first_cateid: 0,
        second_cateid: 0,
        begintime: "",
        endtime: "",
        title: "",
        specsid: 0,
        specsattr: [],
        status: 1,
      },
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // value2: ''
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
        begintime: "",
        endtime: "",
        title: "",
        specsid: 0,
        specsattr: [],
        status: 1,
      };
    },
    ...mapActions({
      requestspecsList: "spec/requestspecsList",
      requestcateList: "classify/requestcateList",
      requestseckList:"seck/requestseckList",
    }),
    // 修改二级分类
    changeCate() {
      this.secondCate = this.cateList.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },

    //添加
    add() {
      reqseckAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        this.requestseckList();
      });
    },
    // 查并获取一条数据
    look(id) {
      reqseckListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // this.form.title = title;
        // this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    // 修改
    update() {
      reqseckEdit(this.form).then((res) => {
        this.hide();
        this.requestcateList();
        // this.empty();
      });
    },
  },
  mounted() {
    this.requestspecsList();
    this.requestcateList();
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