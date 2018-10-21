<template>
<el-dialog
    :title="edit ? '修改文章' : '新增文章'"
    :visible.sync="visible"
    width="85%"
    :fullscreen='false' top='40px'>
    <el-form ref="form" size="mini" label-position="right" label-width="80px" :rules="rules" :model="post" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
            <el-input v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-input v-model="post.cover"></el-input>
        </el-form-item>
       <el-form-item label="分类" prop="category_id">
            <el-select v-model="post.category_id" placeholder="请选择活动区域">
            <el-option v-for="item in categorys" :label="item.title" :value="item.id" :key='item.id'></el-option>
        </el-select>
       </el-form-item>
        <el-form-item label="正文" prop='content'>
          <el-input type="textarea" v-model="post.content" style="min-height:200px;"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="oncommit">确 定</el-button>
    </span>
    <!-- <div>{{item}}</div> -->
  </el-dialog>
</template>

<script>
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      edit: false,
      visible: false,
      categorys: [],
      post: {},
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择分类", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 50, message: "至少输入50个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    // edit() {
    //     return this.$props.edit
    // },
    // post() {
    //     return this.edit
    // }
  },
  created() {
    this.loadcategorys();
  },
  methods: {
    show(post, finished) {
      this.edit = !!post;
      this.post = JSON.parse(JSON.stringify(post || {}));
      this.finished = finished;
      this.visible = true;
    },
    gmtDateFormatter(time) {
      return moment(time).format("YYYY/MM/DD HH:mm");
    },
    loadcategorys() {
      this.$http("/api/mgr/cate/query").then(res => {
        if (!res.error) {
          this.categorys = res;
        }
      });
    },
    oncommit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
        } else {
          const post = {
            id: this.post.id,
            title: this.post.title,
            category_id: this.post.category_id,
            cover: this.post.cover,
            content: this.post.content
          };

          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          this.$http(
            this.edit ? "/api/mgr/article/update" : "/api/mgr/article/add",
            {
              params: post
            }
          ).then(res => {
            loading.close();
            if (!res.error) {
              this.$message({
                message: this.edit ? "修改成功" : "新增成功"
              });
              this.visible = false;
              this.finished && this.finished.call(null, res);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
/* .root {
    width: 100%;
} */
.el-textarea__inner {
  height: 100%;
  min-height: 200px;
}
</style>
