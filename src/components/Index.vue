<template>
  <div class="root">
   
  </div>
</template>

<script>
export default {
  props: {},
  created() {
    this.$http
      .get("/posts")
      .then(res => {
        res;
      })
      .catch(err => {
        this.$message({
          message: err
        });
      });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
