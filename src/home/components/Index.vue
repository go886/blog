<template>
  <div class="root">
   <div class='post' v-for="post in list" :key="post.id">
     <img class='cover' :src="post.cover"/>
     <div class='right'>
      <div class='title'>{{post.title}}</div>
      <div class='content' @click="onpost(post)">
        <div class='desc'>{{post.content}}</div>
      </div>
      <div class='tool'>
        <i class="el-icon-date icon"></i><div class='tool-text'>{{gmtDateFormatter(post.edit_time)}}</div>
        <i class="el-icon-document icon"></i>
              <router-link :to="'/cate/' + post.category_name" class='tool-text'>{{post.category_title}}</router-link>
      </div>
     </div>
   </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {},
  data: function() {
    return {
      list: []
    };
  },
  created() {
    this.$http
      .get("/api/post/query", {params:this.$route.params, cate: this.$route.path.indexOf('/cate') == 0})
      .then(res => {
        this.list = res.data.list;
        this.next = res.data.next;
      })
      .catch(res => {
        this.$message({
          message: res,
          type: "warning"
        });
      });
  },
  computed: {
    time() {
      return moment().format("YYYY MMMM Do");
    }
  },
  methods: {
    gmtDateFormatter(time){
      return moment(time).format("YYYY/MM/DD");
    },
    oncategory(ev, post){
              ev.cancelBubble=true

      this.$router.push('/cate/' + post.category_id)
      alert('a')
    },
    onpost(post) {
      post;
      // this.$router.push('/about')
      location.href = "http://localhost:3000/api/post/get?id=" + post.id;
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
  font-size:8;
  margin-right: 10px;
}
</style>
