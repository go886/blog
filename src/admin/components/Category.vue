<template>
  <div class="root">
    <div class='toolbar'>
      <el-button type="primary" @click="onadd" style="margin-left:10px;margin-right:10px;">添加<i class="el-icon-edit el-icon--right"></i></el-button>
    </div>
    <div class='content'>
      <el-table
        :data="cates"
        style="width: 100%;overflow-y: scroll;"
        stripe>
        <el-table-column
          prop="id"
          label="ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="120">
          <template slot-scope="scope">
            <el-button
            @click.native.prevent="ongotocate(scope.row)"
            type="text"
            size="small">
            {{scope.row.name}}
          </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          width="180"
          :formatter="dateFormatter">
        </el-table-column>
        <el-table-column
          label="最后更新时间"
          width="180"
          :formatter="dateFormatter">
            <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ dateFormatter(scope.row.add_time)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onedit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onremove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  <el-dialog
    :title="edit ? '修改' : '新增'"
    :visible.sync="dialogVisible"
    width="40%">
    <div class='inputpannel'>
     <el-input placeholder="请输入名称" v-model="cate.name" :disabled='edit'>
      <template slot="prepend">名称:</template>
    </el-input>
    </div>
     <div class='inputpannel'>
    <el-input placeholder="请输入标题" v-model="cate.title" >
      <template slot="prepend">标题:</template>
    </el-input>
     </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="oncommitedit">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      cates: [],
      cate: {},
      edit: false,
      dialogVisible: false
    };
  },
  created() {
    this.load();
  },
  methods: {
    dateFormatter(row, column, cellValue) {
      return moment(cellValue).format("YYYY/MM/DD HH:mm");
    },
    load() {
      this.$http("/api/mgr/cate/query")
        .then(res => {
          if (!res.error) this.cates = res;
        })
    },
    onadd() {
      this.cate = {};
      this.edit = false;
      this.dialogVisible = true;
    },
    onedit(cate) {
      this.cate = JSON.parse(JSON.stringify(cate));
      this.edit = true;
      this.dialogVisible = true;
    },
    oncommitedit() {
      this.$http(
        this.edit == true ? "/api/mgr/cate/update" : "/api/mgr/cate/add",
        {
          params: this.cate
        }
      )
        .then(res => {
          if (!res.error) {
            this.$message(this.edit ? "修改成功" : "创建成功");
            this.dialogVisible = false;
            this.load();
          }
        })
    },
    onremove(cate) {
      this.$confirm("此操作将永久删除 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http("/api/mgr/cate/remove", {
            params: cate
          })
            .then(res => {
              if (!res.error) {
                this.$message("删除成功");
                this.cates.splice(this.cates.indexOf(cate), 1);
              }
            })
        })
    },
    ongotocate(cate) {
      window.open("/cate/" + cate.name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.toolbar {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 50px;
  max-height: 50px;
  min-height: 50px;
  margin-bottom: 10px;
  background: #f2f2f2;
}
.inputpannel {
  margin-bottom: 20px;
}
.content {
  position: relative;
  display: flex;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow-y: scroll;
}
</style>
