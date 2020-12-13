<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item, index) in arrAttr"
          :key="index"
        >
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4"
              ><el-button type="primary" v-if="index == 0" @click="addAttr"
                >新增规格属性</el-button
              >
              <el-button type="danger" v-else @click="delAttr(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqspecsAdd,
  reqspecsListOne,
  reqspecsEdit,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
    //   specList: "spec/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        //设置初始值
        attrs: "",
        specsname: "",
        status: 1,
      },
      arrAttr: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    //取消弹框
    hide() {
      this.info.isShow = false;
    },
    //新增规格属性
    addAttr() {
      this.arrAttr.push({
        value: "",
      });
    },
    //新增规格属性删除
    delAttr(index) {
      this.arrAttr.splice(index, 1);
    },
    // 重置
    empty() {
      this.form = {
        attrs: "",
        specsname: "",
        status: 1,
      };
    },
    ...mapActions({
      requestspecsList: "spec/requestspecsList",
    }),
    //添加
    add() {
      this.form.attrs = JSON.stringify(
        this.arrAttr.map((item) => {
          return item.value;
        })
      );
      reqspecsAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        this.requestspecsList();
      });
    },
    // 查并获取一条数据
    look(id) {
      reqspecsListOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.arrAttr = JSON.parse(this.form.attrs).map((item) => {
          return {value:item};
        });
        this.form.id = id;
      });
    },
    // 修改
    update() {
        this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value})) 
      reqspecsEdit(this.form).then((res) => {
        this.hide();
        this.requestspecsList();
        this.empty();
      });
    },
  },
  mounted() {
    this.requestspecsList();
  },
};
</script>
<style scoped>
</style>