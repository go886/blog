<template>
  <div class="root">
          <MarkDown :value="info.content"/>
  </div>
</template>

<script>
import MarkDown from "./Markdown";

export default {
  components: {
    MarkDown
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      this.$http("/api/about/get").then(res => {
        if (!res.error) {
          this.info = res;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
