<template>
  <div class="root" v-if="post">
    <div class="social-share"></div>

      <PostHeader :post="post" />
      <img class="cover" :src="post.cover" />
      <MarkDown :value="post.content"/>
      <div class="bottom">
        <div v-if="prev" class="prev">【上一篇】 <router-link :to="$store.postURL(prev)">{{prev.title}}</router-link></div>
        <div v-if="next" class="prev">【下一篇】 <router-link :to="$store.postURL(next)">{{next.title}}</router-link></div>
      </div>
      <Comment :id="'post:'+ $route.params.id" v-if="post.comment !== false && $store.state.config.setting.enabled_comment"/>
  </div>
</template>

<script>
import PostHeader from "./PostHeader";
import MarkDown from "./Markdown";
import Comment from "./Comment";
export default {
  components: {
    PostHeader,
    MarkDown,
    Comment
  },
  data() {
    return {
      post: null
    };
  },
  watch: {
    $route() {
      this.load();
    }
  },
  computed: {},
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$http("/api/article/get", {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (!res.error) {
          this.post = res.post;
          this.next = res.next;
          this.prev = res.prev;
        } else {
          window.location.href = "/";
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  /* position: relative;
  left: 0;
  top: 0; */
  /* padding: 50px; */
  /* padding: 30px 100px 100px 100px; */
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

.bottom {
  margin-top: 50px;
  border-top: 1px solid #eaecef;
}
.prev {
  margin-top: 8px;
}
</style>
