<template>
 <el-form ref="form"  label-position="right" label-width="80px" :rules="rules" :model="setting" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
          <el-input v-model="setting.name"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url">
          <el-input v-model="setting.url"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
          <el-input v-model="setting.desc"></el-input>
      </el-form-item>
  </el-form>
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
        url: [{ required: true, message: "请输入URL", trigger: "blur" }]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
