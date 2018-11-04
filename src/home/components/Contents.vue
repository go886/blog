<template>
  <div class="root">
   <div  class="post" v-for="post in list" :key="post.id">
     <router-link class="content" :to="$store.postURL(post)">
      <img v-if="post.cover_position !== 4 && post.cover" class='cover' :class="coverPosition(post)"  :src="post.cover"  :title="'查看文章：' + post.title"/>

      <div class="postcontent">
        <PostHeader class="posttxt" :post="post" :summary="true"/>
        <img v-if="post.cover_position == 4 && post.cover" class='cover' :class="coverPosition(post)" :src="post.cover"  :title="'查看文章：' + post.title"/>

        <div class='desc posttxt' v-if="post.summary">
            <p style="text-indent: 2em;margin:0;padding:0;">{{ post.summary +'...' }}</p>
        </div>
      </div>
     </router-link>
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
import PostHeader from "./PostHeader";
import MarkDown from "./Markdown";

export default {
  props: {},
  components: {
    PostHeader,
    MarkDown
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
    $route() {
      this.load();
    }
  },
  created() {
    this.page = parseInt(this.$route.query.page || 1);
    this.load();
  },
  computed: {},
  methods: {
    coverPosition(post) {
      if (1 == post.cover_position) {
        return "cover_left";
      } else if (2 == post.cover_position) {
        return "cover_right";
      } else if (3 == post.cover_position) {
        return "cover_bottom";
      } else if (4 == post.cover_position) {
        return "conver_center";
      } else {
        return "cover_top";
      }
    },
    load() {
      this.$http("/api/article/query", {
        params: {
          pageSize: this.pageSize,
          page: this.page,
          cate: this.$route.params.cate,
          tag: this.$route.params.tag
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
  max-width: 100%;
  /* background-color: beige; */
}
.post {
  background-color: #fff;
  margin-bottom: 20px;
  height: auto;
  display: block;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.5s ease;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
}
.post:hover {
  transform: translate3D(0, -1px, 0) scale(1.01);
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.postcontent {
  padding: 20px 0px;
  flex: 1;
}
.posttxt {
  margin-left: 50px;
  margin-right: 50px;
}
.cover {
  display: block;
  align-self: center;
  width: auto;
  height: auto;
}
.cover_bottom {
  width: 100%;
  min-width: 100%;
  display: block;
  height: auto;
}
.cover_top {
  width: 100%;
  min-width: 100%;
  display: block;
  height: auto;
  max-height: 400px;
  align-self: center;
}
.cover_left {
  display: block;
  align-self: center;
  height: 100%;
  width: 400px;
}
.cover_right {
  display: block;
  align-self: center;
  width: 380px;
  /* max-width: 300px; */
  height: 100%;
  order: 2;
}
.cover_bottom {
  width: 100%;
  min-width: 100%;
  display: block;
  height: auto;
  max-height: 400px;
  align-self: center;
  order: 2;
}
.conver_center {
  width: 100%;
  min-width: 100%;
  display: block;
  height: auto;
  max-height: 400px;
  align-self: center;
}

.right {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 28px;
}
/* .content {
  flex: 1;
  display: flex;
  flex-direction: column;
} */
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: #15171a;
  font-size: 17px;
  line-height: 24px;
  margin-top: 10px;
  line-break: auto;
  word-wrap:break-word;
    word-break:break-all;
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
