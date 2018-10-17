<template>
  <div class="root">
   <div class='post' v-for="post in list" :key="post.id" @click="onpost(post)">
     <img class='cover' :src="post.cover"/>
     <div class='right'>
      <div class='title'>{{post.title}}</div>
      <div class='content'>
        <div class='desc'>{{post.content}}</div>
      </div>
      <div class='tool'>
        <div>{{time}}</div>
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
      .get("/api/post/query")
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
}
</style>
