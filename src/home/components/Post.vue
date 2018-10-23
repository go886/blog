<template>
  <div class="root">
      <PostHeader :post="post" />
      <img class="cover" :src="post.cover" />
      <MarkDown :value="post.content"/>
  </div>
</template>

<script>
import moment from "moment";
import PostHeader from "./PostHeader";
import MarkDown from "./Markdown";
export default {
  components: {
    PostHeader,
    MarkDown
  },
  data() {
    return {
      post: {}
    };
  },
  created() {
    this.load();
  },
  methods: {
    gmtDateFormatter(time) {
      return moment(time).format("YYYY/MM/DD");
    },
    markDownToHtml(txt) {
      return md.render(txt);
    },
    load() {
      this.$http("/api/article/get", {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (!res.error) {
          this.post = res;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  position: relative;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  /* display: flex; */
  /* flex-direction: column; */
  /* padding-left: 270px;
  padding-right: 270px; */
  /* background-color: #0099ff; */
  padding: 30px 100px 100px 100px;
}
.header {
  display: flex;
  flex-direction: column;
  font-family: Georgia, Palatino, serif;
  /* background-color: #0099ff; */
  border-left: 5px solid #6ce26c;
  padding-bottom: 5px;
  padding-left: 5px;
  margin-bottom: 20px;
}
.title {
  font-size: 42px;
  line-height: 42px;
  color: #111111;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}
.date {
  font-size: 11px;
  color: #999;
  display: flex;
  flex-direction: row;
}
.cover {
  max-width: 75% !important;
  height: auto;
  display: block;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
}
</style>

<style>
</style>
