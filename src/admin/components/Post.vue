<template>
  <div class="root">
    <div class='toolbar'>
      <el-button type="primary" @click="onadd" style="margin-left:10px;margin-right:10px;">添加<i class="el-icon-edit el-icon--right"></i></el-button>
    </div>
    <el-table
        :data="list"
        style="width: 100%"
        stripe
        >
        <el-table-column type="expand">
          <template scope="props">
            <PostPannel :info="props.row"/>
          </template>
        </el-table-column>
    <!-- <el-table-column
      type="index"
      width="50">
    </el-table-column> -->
        <el-table-column
          prop="id"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="_k"
          label="Key"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
           <template slot-scope="scope">
           <el-button
            @click.native.prevent="onpost(scope.row)"
            type="text"
            size="small">
            {{scope.row.title}}
          </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="category_title"
          label="分类"
          >
           <template slot-scope="scope">
           <el-button
            @click.native.prevent="oncate(scope.row)"
            type="text"
            size="small">
            {{scope.row.category_title}}
          </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="read_num"
          label="Pv"
          width="80">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="left" width="85" :filters="status" :filter-method="filterStatus">
          <template scope="scope">
            <div>
             <el-tag v-if="scope.row.status == 0"  size="small" type="danger">未发布</el-tag>
             <el-tag v-else-if="scope.row.status == 1"  size="small">发布</el-tag>
            </div>
          </template>
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
        <el-table-column label="操作"         
          width="180"
        >
          <template scope="scope">
              <el-button size="small" @click="onedit(scope.row)">编辑</el-button>
              <el-dropdown trigger="click">
                  <el-button size="small">
                      更多<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="onremove(scope.row)">删除</el-dropdown-item>
                      <el-dropdown-item @click.native="onpublish(scope.row)" >{{scope.row.status == 0 ? "发布" : "撤回"}}</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
  <!-- <el-dialog
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
  </el-dialog> -->
  </div>
</template>

<script>
import moment from "moment";
import PostPannel from "./PostPannel";
export default {
  components: {
    PostPannel
  },
  data() {
    return {
      list: [],
      item: {},
      edit: false,
      dialogVisible: false,
      status: [
        {
          value: 0,
          text: "待发布"
        },
        {
          value: 1,
          text: "发布"
        }
      ]
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
      this.$http
        .get("/api/mgr/post/query")
        .then(res => {
          console.log(res);
          this.list = res.data.list;
          this.next = res.data.next;
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "warning"
          });
        });
    },
    onpost(post) {
      window.open("/" + post.category_name + "/" + post._k);
    },
    oncate(post) {
      window.open("/cate/" + post.category_name);
    },
    filterStatus(value, row) {
      return value == row.status;
    },
    onadd() {
      this.cate = {};
      this.edit = false;
      this.dialogVisible = true;
    },
    onedit(post) {
      window.open("/post/" + post.id);
      // this.cate = JSON.parse(JSON.stringify(cate));
      // this.edit = true;
      // this.dialogVisible = true;
    },
    onremove(post) {},
    onpublish(post) {
      const publish = post.status == 0;
      this.$http
        .get("/api/mgr/post/publish", {
          params: {
            id: post.id,
            publish
          }
        })
        .then(res => {
          if (res.data.error) {
            this.$message({
              message: res.data.error,
              type: "warning"
            });
          } else {
            this.$message(publish ? "发布成功" : "已撤回");
            post.status = publish ? 1 : 0;
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "warning"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  /* display: flex;
  flex: 1; */
  width: 100%;
}
.toolbar {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 50px;
  background: #f2f2f2;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 20px;
}
.inputpannel {
  margin-bottom: 20px;
}
</style>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
