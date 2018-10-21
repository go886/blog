<template>
<el-dialog
    :title="edit ? '修改 - 友情连接' : '新增 - 友情连接'"
    :visible.sync="visible"
    width="65%"
    :fullscreen='false' >
    <el-form ref="form"  label-position="right" label-width="80px" :rules="rules" :model="item" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
            <el-input v-model="item.url"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
            <el-input v-model="item.desc"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="oncommit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      edit: false,
      visible: false,
      item: {},
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入URL", trigger: "blur" }]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    show(item, finished) {
      this.edit = !!item;
      this.item = JSON.parse(JSON.stringify(item || {}));
      this.finished = finished;
      this.visible = true;
    },
    oncommit() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
        } else {
          const item = {
            id: this.item.id,
            name: this.item.name,
            url: this.item.url,
            desc: this.item.desc
          };

          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          this.$http(this.edit ? "/api/mgr/link/update" : "/api/mgr/link/add", {
            params: item
          }).then(res => {
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
