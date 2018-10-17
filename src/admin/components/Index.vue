<template>
  <div class="root">
      helper...
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
      .then(res => {})
      .catch(err => {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
