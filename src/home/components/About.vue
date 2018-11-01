<template>
  <div class="root">
          <MarkDown :value="post.content"/>

  </div>
</template>

<script>
import MarkDown from "./Markdown";

export default {
  components: {
    MarkDown
  },

  methods: {
    onload() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
