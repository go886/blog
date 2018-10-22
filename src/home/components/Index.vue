<template>
  <div class="root">
   <div class='post' v-for="post in list" :key="post.id">
     <img class='cover' :src="post.cover"/>
     <div class='right'>
      <div class='title' >
        <router-link :to="'/' + post.category_name + '/' +post._k" class='tool-text'>{{post.title}}</router-link>
      </div>
      <div class='content' >
        <div class='desc'>{{post.content}}</div>
      </div>
      <div class='tool'>
        <i class="el-icon-date icon"></i><div class='tool-text'>{{gmtDateFormatter(post.edit_time)}}</div>
        <i class="el-icon-document icon"></i>
              <router-link :to="'/cate/' + post.category_name" class='tool-text'>{{post.category_title}}</router-link>
      </div>
     </div>
   </div>
    <el-pagination v-if='list.length > 0'
      :page-size="pageSize"
      :current-page.sync="page"  
      layout="total, prev, pager, next"
      :total="total"
      @current-change="onPageChanged"
      background>
    </el-pagination>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {},
  data: function() {
    return {
      list: [],
      pageSize: 5,
      page: 1,
      total: 0
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page || 1);
    this.load();
    // this.$http("/api/article/query", {
    //   params: this.$route.params,
    //   cate: this.$route.path.indexOf("/cate") == 0
    // })
    //   .then(res => {
    //     this.list = res.list;
    //     this.next = res.next;
    //   })
    //   .catch(res => {
    //     this.$message({
    //       message: res,
    //       type: "warning"
    //     });
    //   });
  },
  computed: {
    time() {
      return moment().format("YYYY MMMM Do");
    }
  },
  methods: {
    gmtDateFormatter(time) {
      return moment(time).format("YYYY/MM/DD");
    },
    load() {
      this.$http("/api/article/query", {
        params: {
          pageSize: this.pageSize,
          page: this.page,
          cate:
            this.$route.name == "分类" ? this.$route.path.substring(1) : null
        }
      }).then(res => {
        if (!res.error) {
          this.list = res.list;
          this.total = res.total;
          this.page = res.page;
        }
      });
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
      this.load();
    },
    oncategory(ev, post) {
      ev.cancelBubble = true;

      this.$router.push("/cate/" + post.category_id);
      alert("a");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  display: flex;
  background-color: bisque;
  margin-bottom: 20px;
  padding: 13px;
}
.cover {
  min-width: 300px;
  min-height: 220px;
  width: 300px;
  height: 220px;
  margin-right: 18px;
}
.right {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 28px;
}
.content {
  flex: 1;
}
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.tool {
  height: 32px;
  background-color: antiquewhite;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 8px;
}
.icon {
  margin-right: 5px;
}
.tool-text {
  font-size: 8;
  margin-right: 10px;
}
</style>
