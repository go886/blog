<template>
<div class='root'>
 <el-form ref="form" style="width: 70%;"  label-position="right" label-width="100px" :rules="rules" :model="setting" class="demo-ruleForm">
      <el-form-item label="名称" prop="name" >
          <el-input v-model="setting.name"></el-input>
      </el-form-item>
      <el-form-item label="网站主标题" prop="title">
          <el-input v-model="setting.title"></el-input>
      </el-form-item>
      <el-form-item label="网站描述" prop="desc">
          <el-input v-model="setting.desc"></el-input>
      </el-form-item>
      <el-form-item label="网站关键字" prop="keywords">
          <el-input v-model="setting.keywords"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url">
          <el-input v-model="setting.url"></el-input>
      </el-form-item>
      <el-form-item label="加速地址" prop="cdn">
          <el-input v-model="setting.cdn"></el-input>
      </el-form-item>
      <el-form-item label="主题选择" prop="theme">
          <el-input v-model="setting.theme"></el-input>
      </el-form-item>
       <el-form-item label="统计代码" prop="tracker">
         <el-input type="textarea" v-model="setting.tracker" :rows="5" ></el-input>
      </el-form-item>
      <el-form-item label="评论" prop="comment">
        <el-switch v-model="setting.comment"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存设置</el-button>
     </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      setting: {},
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, message: "至少输入 3 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$http("/api/mgr/setting/get").then(res => {
        if (!res.error) {
          this.setting = res;
        }
      });
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          this.$http("/api/mgr/setting/update", {
            params: this.setting
          }).then(res => {
            loading.close();
            if (!res.error) {
              this.$message({
                message: "保存成功"
              });
            }
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
    margin-top: 10px;
    margin-left: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}
</style>
