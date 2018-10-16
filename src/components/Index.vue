<template>
  <div class="root">
   <div class='post' v-for="post in list" :key="post.id" @click="onpost">
     <img class='cover' :src="post.cover"/>
     <div class='right'>
      <div class='title'>{{post.title}}</div>
      <div class='content'>{{post.content}}</div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  props: {},
  data: function() {
    return {
      list: []
    };
  },
  created() {
    this.$http
      .get("/api/posts")
      .then(res => {
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
  methods: {
    onpost(post) {
      post;
      this.$router.push('/about')
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
}
.title {
  font-size: 28px;
}
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
