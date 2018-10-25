<template>
  <div class="root">
   <div class='post' v-for="post in list" :key="post.id">
      <PostHeader :post="post" :enabledlink="true"/>
      <div class='content' >
        <img v-if="post.cover" class='cover' :src="post.cover"/>

        <div class='desc' v-if="post.summary">
          <p style="text-indent: 2em;margin:0;padding:0;">{{ post.summary +'...' }}</p>
        </div>
      </div>
   </div>
   <div class="pagination">
    <el-pagination v-if='list.length > 0'
      :page-size="pageSize"
      :current-page.sync="page"  
      layout="total, prev, pager, next"
      :total="total"
      @current-change="onPageChanged"
      background>
    </el-pagination>
   </div>
  </div>
</template>

<script>
import moment from "moment";
import PostHeader from "./PostHeader";
import MarkDown from "./Markdown";

export default {
  props: {},
  components: {
    PostHeader,
    MarkDown,
  },
  data: function() {
    return {
      list: [],
      pageSize: 5,
      page: 1,
      total: 0
    };
  },
  watch: {
    $route(to, from) {
      console.log("to:", to);
      console.log("from:", from);

      // if (to.path == from.path && to.name ='') {
      this.load();
      // }
    }
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
.root {
  flex: 1;
  /* max-width: 75%; */
  /* padding: 30px; */
  display: flex;
  flex-direction: column;
  /* background-color: beige; */
}
.post {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 50px;

  height: auto;
  display: block;
  border-radius: 5px;
}
.cover {
  align-self: center;
  width: 620px;
  max-width: 80%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;

  height: auto;
  display: block;
  border-radius: 5px;
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
  display: flex;
  flex-direction: column;
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
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
