<template>
  <div id="gitalk-container">
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      gittalk: new Gitalk({
        clientID: "885d430a68199b086afb",
        clientSecret: "aa0f736f6833237412f12932a96ca8777e883703",
        repo: "blog-comment",
        owner: "go886",
        admin: ["go886"],
        id: this.$props.id, // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
        // createIssueManually:true,
        number:-1,
      })
    };
  },
  mounted() {
    this.gittalk.render("gitalk-container");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
