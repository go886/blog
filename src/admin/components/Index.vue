<template>
  <div class="root">
      <div>
        <a href="http://localhost:3000/api/mgr/post/view" target="_blank">view</a>
      </div>
      <div>
        <a href="http://localhost:3000/api/mgr/post/add" target="_blank">post_add</a>
      </div>
         <div>
        <a href="/login.html" target="_blank">login</a>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  created() {
    this.$http
      .get("/api/mgr/cate/query")
      .then(res => {
        res;
      })
      .catch(err => {
        err;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
