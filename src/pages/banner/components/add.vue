<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <!-- 图片 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
//引入富文本
import E from "wangeditor";
import {
  reqbannerAdd,
  reqbannerListOne,
  reqbannerEdit,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      bannerList: "banner/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    //让弹框消失
    hide() {
      this.info.isShow = false;
    },
    //上传图片
    changeImg(e) {
      let file = e.raw;
      console.log(e);
      //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
      //createObjectURL是同步执行（立即的）
      //createObjectURL返回一段带hash的url，并且一直存储在内存中，直到document触发了unload事件（例如：document close）或者执行revokeObjectURL来释放。
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 清空数据
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    ...mapActions({
      requestbannerList: "banner/requestbannerList",
    }),
    //添加
    add() {
      reqbannerAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        this.requestbannerList();
      });
    },
    // 查并获取一条数据
    look(id) {
      reqbannerListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    // 修改
    update() {
      reqbannerEdit(this.form).then((res) => {
        this.hide();
        this.requestbannerList();
        this.empty();
      });
    },
  },
  mounted() {
    this.requestbannerList();
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