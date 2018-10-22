<template>
<div class='root'>
 <el-form ref="form" style="width: 400px;"  label-position="right" label-width="100px" :rules="rules" :model="user" class="demo-ruleForm">
      <el-form-item label="登录账号" >
          <el-input v-model="user.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nick">
          <el-input v-model="user.nick"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="logo">
          <el-input v-model="user.logo"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="pwd">
          <el-input type="password" v-model="user.pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
          <el-input type="password" v-model="user.newpwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd2">
          <el-input type="password" v-model="user.newpwd2"></el-input>
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
      user: {},
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
      this.$http("/api/mgr/user/get").then(res => {
        if (!res.error) {
          this.user = res;
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

          this.$http("/api/mgr/user/update", {
            params: this.user
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
    margin-top: 20px;
    margin-left: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}
</style>
